"use client";
import { list } from "@/api/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { currencyFormat } from "@/helpers/functions";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import {
  useCartBadge,
  useCategoryTree,
  useWishlistBadge,
} from "@/hooks/ecommerce.hooks";

const NavigationMobile = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: categories } = useCategoryTree();
  const { data: cartCount, refetch } = useCartBadge();
  const { data: wishlistCount } = useWishlistBadge();

  const [menuOpen, setMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm?.length >= 3) {
      router.push(`/search?search=${searchTerm}`);
      setSearchOpen(false);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen, searchOpen]);

  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const handleScrollIconDisappear = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300) {
        setSearchVisible(true);
      } else {
        setSearchVisible(false);
      }
    };

    window.addEventListener("scroll", handleScrollIconDisappear);
    return () => {
      window.removeEventListener("scroll", handleScrollIconDisappear);
    };
  }, []);

  useEffect(() => {
    if (pathname?.includes("/korpa/")) {
      refetch();
      router?.refresh();
    }
  }, [pathname]);

  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data: searchData, isFetching } = useQuery({
    queryKey: ["searchData", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch?.length >= 3) {
        return await list(`/products/search/list`, {
          search: debouncedSearch,
        }).then((res) => {
          return res?.payload;
        });
      }
    },
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const categoriesMain = [
    { name: "Novo", slug: "/novo" },
    { name: "Kontakt", slug: "/kontakt" },
  ];

  const handleCategoryClick = (category) => {
    if (!category.children?.length) {
      router.push(`/${category.slug}`);
      setMenuOpen(false);
      return;
    }

    if (expandedCategory === category.id) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category.id);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-[2000] w-full bg-white bg-opacity-90 backdrop-blur-md xl:hidden">
        <div className="sectionPaddingX flex items-center justify-between py-3">
          <div onClick={() => setMenuOpen(true)}>
            <Image
              alt={`HAMBURGER ICON`}
              src={"/icons/hamburger.png"}
              width={30}
              height={30}
            />
          </div>
          <Link href="/">
            <div className="relative">
              <Image
                alt={`logo`}
                src={"/images/logo/logo.svg"}
                width={150}
                height={33}
                className="h-auto w-36"
              />
            </div>
          </Link>
          <div className="relative flex items-center gap-4">
            {pathname === "/" ? (
              <div
                className={
                  searchVisible
                    ? `visible opacity-100 transition-all duration-500`
                    : `invisible opacity-0 transition-all duration-500`
                }
              >
                <Image
                  src="/icons/search.png"
                  alt="search icon"
                  id="search"
                  width={22}
                  className="h-auto w-6 object-cover md:hidden"
                  height={22}
                  onClick={() => setSearchOpen(true)}
                />
              </div>
            ) : (
              <div className="md:hidden">
                <Image
                  src="/icons/search.png"
                  alt="search icon"
                  id="search"
                  width={22}
                  className="h-auto w-6 object-cover"
                  height={22}
                  onClick={() => setSearchOpen(true)}
                />
              </div>
            )}
            <Image
              src="/icons/search.png"
              alt="search icon"
              id="search"
              width={22}
              className="h-auto w-6 object-cover max-md:hidden"
              height={22}
              onClick={() => setSearchOpen(true)}
            />
            <Link href="/korpa " className="relative">
              <Image
                alt="cart icon"
                className="h-auto w-7 object-cover"
                src="/icons/trolley.svg"
                width={21}
                height={21}
              />
              {cartCount > 0 && (
                <span className="absolute -right-1 top-0 min-w-4 rounded-full bg-primary px-1 py-0 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>{" "}
      </div>
      <div
        className={
          searchVisible
            ? `text-white ${
                pathname === "/" ? `flex items-center justify-center` : `hidden`
              } invisible sticky top-[60px] z-[4000] bg-transparent opacity-0 transition-all duration-500 md:hidden`
            : `text-white ${
                pathname === "/" ? `flex items-center justify-center` : `hidden`
              } visible sticky top-[60px] z-[4000] bg-transparent opacity-100 transition-all duration-500 md:hidden`
        }
      >
        <form
          className="absolute mx-auto mt-14 flex h-12 w-[90%] items-center py-2"
          onClick={() => setSearchOpen(true)}
        >
          <div
            type="text"
            className="h-full w-full rounded-lg border border-white bg-transparent py-2 pl-8 text-xs text-white mix-blend-difference placeholder:text-xs placeholder:text-white focus:border-white focus:outline-none focus:ring-0"
            placeholder="Pretraga"
            onChange={(e) => setSearchTerm(e.target.value)}
            onMouseDown={() => setSearchOpen(true)}
          />
          <p className="absolute left-8 text-sm">Pretraga</p>
          <i className="fa-solid fa-search absolute left-2 top-5 text-xs text-white"></i>
        </form>
      </div>
      <div
        className={
          menuOpen
            ? `fixed left-0 top-0 z-[5000] flex h-screen w-full translate-x-0 flex-col overflow-y-auto bg-white transition-all duration-500`
            : `fixed left-0 top-0 z-[5000] flex h-screen w-full -translate-x-full flex-col bg-white transition-all duration-500`
        }
      >
        <div className="mx-auto flex w-[95%] items-center justify-between py-3.5">
          <i
            className="fas fa-times text-2xl"
            onClick={() => setMenuOpen(false)}
          ></i>
          <Image
            src="/images/logo/logo.svg"
            width={150}
            height={150}
            alt="logo"
            className="h-auto w-36"
          />
          <div className="flex items-center">
            <Link href="/lista-zelja">
              <div
                className="relative"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                <Image
                  src="/icons/bookmark.svg"
                  width={21}
                  height={21}
                  className="mx-5 h-auto w-5 object-cover"
                  alt="heart"
                />
                <span className="absolute -top-2.5 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {wishlistCount}
                </span>
              </div>
            </Link>
            <Link href={`/login`}>
              <Image
                alt="user icon"
                src={"/icons/user.png"}
                width={21}
                height={21}
                className="h-auto w-5 object-cover"
              />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-5 flex w-[95%] flex-col gap-3">
          {(categories ?? [])?.map((category) => {
            const isExpanded = expandedCategory === category?.id;
            return (
              <div key={category?.id} className="flex flex-col">
                <div
                  className="flex flex-row items-center justify-between"
                  onClick={() => handleCategoryClick(category)}
                >
                  <p
                    className={isExpanded ? `text-base font-bold` : `text-base`}
                  >
                    {category?.name}
                  </p>
                  {category?.children?.length > 0 && (
                    <Image
                      src="/icons/right-chevron.png"
                      width={16}
                      height={16}
                      alt="chevron"
                      className={`h-auto w-4 transition-transform duration-300 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </div>
                {isExpanded && category?.children?.length > 0 && (
                  <div className="ml-4 mt-3 flex flex-col gap-2">
                    {category.children.map((subCategory) => (
                      <div
                        key={subCategory.id}
                        className="flex items-center justify-between"
                        onClick={() => {
                          if (subCategory?.link?.link_path) {
                            router.push(`/${subCategory.link.link_path}`);
                            setMenuOpen(false);
                          }
                        }}
                      >
                        <span className="text-base">{subCategory.name}</span>
                        {subCategory?.children?.length > 0 && (
                          <Image
                            src="/icons/right-chevron.png"
                            width={16}
                            height={16}
                            alt="chevron"
                            className="h-auto w-4"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-3 flex w-[95%] flex-col gap-3 border-t pt-3">
          {(categoriesMain ?? [])?.map((category) => (
            <Link
              key={category?.name}
              onClick={() => {
                setMenuOpen(false);
              }}
              href={`${category?.slug}`}
              className={`text-base`}
            >
              {category?.name}
            </Link>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed left-0 top-0 z-[4000] h-screen w-screen bg-black bg-opacity-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      {searchOpen && (
        <div className="fixed left-0 top-0 z-[10000] h-screen w-screen overflow-y-auto bg-white">
          <div className="mx-auto mt-6 flex w-[95%] items-center gap-2">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                className="w-full border border-gray-400 pl-10 placeholder:text-base focus:border-gray-400 focus:outline-none focus:ring-0"
                placeholder="Unesite pojam za pretragu "
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 transform text-sm text-[#191919]"></i>
              {searchTerm?.length >= 1 && searchTerm?.length < 3 ? (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 py-2">
                  <span className={`text-[0.8rem] font-normal text-red-500`}>
                    Unesite najmanje 3 karaktera.
                  </span>
                </div>
              ) : null}
            </form>
            <p
              className="w-[60px] text-xs"
              onClick={() => {
                setSearchOpen(false);
                setSearchTerm("");
              }}
            >
              Otkaži
            </p>
          </div>
          {searchData?.items?.length > 0 && searchTerm?.length > 0 && (
            <div className="mx-auto mt-5 w-[95%]">
              <p className="text-[1rem] font-normal">Rezultati pretrage</p>
              <div className="mt-3 flex flex-col gap-5">
                {searchData?.items?.slice(0, 6)?.map((item) => {
                  return (
                    <Link
                      key={item?.id}
                      href={`/${item?.link?.link_path}`}
                      onClick={(e) => {
                        setSearchOpen(false);
                        handleSearch(e);
                        setSearchTerm("");
                      }}
                    >
                      <div className="flex flex-row items-center gap-5">
                        <div className="relative h-[60px] w-[60px] min-w-[60px] rounded-full bg-lightGray">
                          <Image
                            src={item.image[0] ?? "/images/placeholder.jpg"}
                            alt={``}
                            fill
                            sizes="100vw"
                            className={`rounded-full object-cover`}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-normal">
                            {item?.basic_data?.name}
                          </p>
                          <div className="flex w-fit gap-3 text-left text-base font-bold">
                            {item?.price?.min?.price_defined &&
                            item?.price?.max?.price_defined ? (
                              item.price.min.price.discount ===
                                item.price.max.price.discount &&
                              item.price.min.price.original ===
                                item.price.max.price.original ? (
                                item.price.min.price.discount ? (
                                  <>
                                    {currencyFormat(
                                      item.price.min.price.discount,
                                    )}
                                    <del>
                                      {currencyFormat(
                                        item.price.min.price.original,
                                      )}
                                    </del>
                                  </>
                                ) : (
                                  currencyFormat(item.price.min.price.original)
                                )
                              ) : item.price.max.price.discount ? (
                                <div className="flex flex-col gap-1">
                                  {currencyFormat(
                                    item.price.min.price.discount,
                                  )}{" "}
                                  -{" "}
                                  {currencyFormat(
                                    item.price.max.price.discount,
                                  )}
                                  <del>
                                    {currencyFormat(
                                      item.price.min.price.original,
                                    )}{" "}
                                    -{" "}
                                    {currencyFormat(
                                      item.price.max.price.original,
                                    )}
                                  </del>
                                </div>
                              ) : item.price.min.price.original ===
                                item.price.max.price.original ? (
                                currencyFormat(item.price.min.price.original)
                              ) : (
                                <>
                                  {currencyFormat(
                                    item.price.min.price.original,
                                  )}{" "}
                                  -{" "}
                                  {currencyFormat(
                                    item.price.max.price.original,
                                  )}
                                </>
                              )
                            ) : item?.price?.price?.discount ? (
                              <>
                                <del>
                                  {currencyFormat(item.price.price.original)}
                                </del>
                                {currencyFormat(item.price.price.discount)}
                              </>
                            ) : (
                              currencyFormat(item?.price?.price?.original)
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                {searchData?.items?.length > 6 && (
                  <Link
                    href={`/search?search=${searchTerm}`}
                    className={`mainButton my-4`}
                    onClick={(e) => {
                      setSearchOpen(false);
                      handleSearch(e);
                      setSearchTerm("");
                    }}
                  >
                    {`Pogledaj sve rezultate ( još ${
                      searchData?.pagination?.total_items -
                      (searchData?.items?.length > 6
                        ? 6
                        : searchData?.items?.length)
                    } )`}
                  </Link>
                )}
              </div>
            </div>
          )}
          {isFetching && (
            <div className={`mx-auto mt-5 w-[95%] text-center`}>
              <i className={`fas fa-spinner fa-spin text-xl text-black`}></i>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavigationMobile;
