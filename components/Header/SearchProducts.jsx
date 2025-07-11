"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { list } from "@/api/api";
import Link from "next/link";
import { currencyFormat } from "@/helpers/functions";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import noImage from "../../public/images/placeholder.jpg";

const SearchProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const router = useRouter();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const { data: searchData, isFetching } = useQuery({
    queryKey: ["searchData", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch?.length >= 3) {
        return await list(`/products/search/list`, {
          search: debouncedSearch,
        }).then((res) => {
          setLoading(false);
          return res?.payload;
        });
      }
      return [];
    },
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm?.length >= 3) {
      router.push(`/search?search=${searchTerm}`);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm("");
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="" ref={searchRef}>
      <div className="group w-5 py-2">
        <Image
          src={"/icons/search.png"}
          width={20}
          height={20}
          className="mainColorFilter cursor-pointer object-cover"
          alt="search"
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
        />
      </div>

      {isOpen && (
        <>
          <div
            className="absolute inset-0 left-0 top-[110px] z-[90] h-screen bg-black/50"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute left-0 top-[110px] z-[100] w-full bg-[#F2F2F2] p-10 px-20 max-lg:hidden 2xl:px-[120px]">
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                ref={inputRef}
                type="text"
                className="mb-4 w-full rounded-full border border-gray-300 px-4 py-2 text-sm text-black placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Pretraži proizvode..."
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setLoading(true);
                }}
                value={searchTerm}
              />
            </form>

            {searchTerm?.length > 0 && searchTerm.length < 3 && (
              <div className="mb-3 text-sm text-red-500">
                Unesite najmanje 3 karaktera.
              </div>
            )}

            {debouncedSearch?.length >= 3 && (
              <div className="overflow-y-auto">
                {searchData?.items?.length > 0 ? (
                  <div>
                    <p className="mb-3 text-[1rem] font-normal">
                      Rezultati pretrage
                    </p>
                    <div className="grid grid-cols-2 gap-10 3xl:grid-cols-3">
                      {searchData?.items?.slice(0, 6)?.map((item) => (
                        <Link
                          key={item?.link?.link_path}
                          href={`/${item?.link?.link_path}`}
                          onClick={() => {
                            setSearchTerm("");
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-4"
                        >
                          <div className="relative h-[60px] w-[60px] min-w-[60px] rounded-lg bg-white">
                            <Image
                              src={item.image[0] || noImage}
                              alt=""
                              fill
                              sizes="100vw"
                              className="rounded-lg object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {item?.basic_data?.name}
                            </p>
                            <div className="text-sm font-bold">
                              {item?.price?.price?.discount ? (
                                <>
                                  <del>
                                    {currencyFormat(item.price.price.original)}
                                  </del>{" "}
                                  {currencyFormat(item.price.price.discount)}
                                </>
                              ) : (
                                currencyFormat(item?.price?.price?.original)
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  !isFetching && (
                    <div className="text-sm">Nema rezultata pretrage</div>
                  )
                )}
                {loading && (
                  <div className="mt-3 text-center">
                    <i className="fas fa-spinner fa-spin text-xl text-black"></i>
                  </div>
                )}
                {!loading && searchData?.items?.length > 0 && (
                  <div className="mainButton sticky bottom-0 mt-5 w-full py-2 text-center">
                    <button onClick={(e) => handleSearch(e)} className="w-full">
                      Prikaži sve rezultate (
                      {searchData?.pagination?.total_items > 10
                        ? `još ${searchData?.pagination?.total_items - 10}`
                        : `Pretraži`}
                      )
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchProducts;
