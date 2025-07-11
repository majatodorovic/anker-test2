"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Thumb } from "../../../components/Thumb/Thumb";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "@/hooks/ecommerce.hooks";
import BreadcrumbsStatic from "../../../components/BreadcrumbsStatic/BreadcrumbsStatic";

const SearchPage = () => {
  const params = useSearchParams();

  const search = params.get("search");

  const { data: returnedProducts, isFetching: loading } = useSearch({
    searchTerm: search,
    isSearchPage: true,
  });

  return (
    <>
      {returnedProducts?.length > 0 && !loading ? (
        <>
          <BreadcrumbsStatic
            breadcrumbs={[{ name: "Pretraga", url: "/search" }]}
            title={`Rezultati pretrage za termin "${search}"`}
          />
          <div className="sectionPaddingY mx-auto w-full bg-lightGray">
            <div className="sectionPaddingX grid grid-cols-1 gap-x-5 gap-y-[20px] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {returnedProducts.map((product, index) => (
                <Suspense
                  key={index}
                  fallback={
                    <div
                      className={`aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
                    />
                  }
                >
                  <Thumb slug={product?.id} key={product?.id} light />
                </Suspense>
              ))}
            </div>
          </div>
        </>
      ) : (
        !loading && (
          <div className="sectionPaddingY flex flex-col items-center justify-center text-center">
            <div className="border bg-lightGray p-10">
              <Image
                src={"/icons/no-results.png"}
                alt="404"
                width={130}
                height={130}
                className="mx-auto mb-10"
              />
              <div>
                <p className="text-lg font-medium">
                  Vaša pretraga nije dala nikakve rezultate.
                </p>
                <p className="text-sm">
                  Trenutno ne postoji rezultat za Vašu pretragu &quot;{search}
                  &quot;.
                </p>
                <p className="mt-4 text-lg font-medium">Pomoć u pretrazi:</p>
                <ul className="text-sm">
                  <li className="mt-2">• Proverite greške u kucanju.</li>
                  <li className="mt-2">
                    • Koristite više generčkih termina za pretragu.
                  </li>
                  <li className="mt-2">
                    • Proizvod ili kategorija koju tražite možda nisu još uvek
                    dostupni na našoj online prodavnici.
                  </li>
                  <li className="mt-2">
                    • Ukoliko Vam je potrebna pomoć, u svakom trenutku nas
                    možete kontaktirati pozivom na broj call centra
                  </li>
                </ul>
              </div>
              <div>
                <Link href="/">
                  <button className="mainButton mt-10">
                    Vrati se na početnu stranu
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default SearchPage;
