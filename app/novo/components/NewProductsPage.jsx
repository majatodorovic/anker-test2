"use client";
import { Thumb } from "@/components/Thumb/Thumb";
import Link from "next/link";
import { useNewProducts } from "@/hooks/ecommerce.hooks";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BreadcrumbsStatic from "../../../components/BreadcrumbsStatic/BreadcrumbsStatic";
import { CategoryPagination } from "@/_pages/category/CategoryPagination";

const NewProductsPage = () => {
  let pagination_type = process.env.PAGINATION_TYPE;
  const router = useRouter();
  const params = useSearchParams();

  const pageKey = Number(params?.get("strana"));
  const [page, setPage] = useState(pageKey > 0 ? pageKey : 1);

  const { data: newProducts } = useNewProducts(page, 12);

  const updateURLQuery = (page) => {
    // Build query string with proper separator logic
    let parts = [];

    if (page > 0) {
      parts.push(`strana=${page}`);
    }

    // Join with & and add ? prefix
    const query_string = parts.length > 0 ? `?${parts.join("&")}` : "";

    return query_string;
  };

  useEffect(() => {
    const query_string = updateURLQuery(page);
    router.push(query_string, { scroll: false });
  }, [page]);

  const getPaginationArray = (selectedPage, totalPages) => {
    const start = Math.max(1, selectedPage - 2);
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  return (
    <>
      {newProducts?.items?.length > 0 && (
        <BreadcrumbsStatic
          breadcrumbs={[{ name: "Novo u ponudi" }]}
          title={"Novo"}
        />
      )}
      <div
        className={`sectionPaddingY mx-auto w-full ${newProducts?.items?.length > 0 && "bg-lightGray"}`}
      >
        <div className={`sectionPaddingX`}>
          {newProducts?.items?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-x-5 gap-y-[20px] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {newProducts?.items?.map(({ id }) => {
                  return (
                    <Suspense
                      key={id}
                      fallback={
                        <div
                          className={`aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
                        />
                      }
                    >
                      <Thumb slug={id} />
                    </Suspense>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="border bg-lightGray p-10">
                <h1 className="text-[18px] font-bold">
                  Trenutno nema novih proizvoda.
                </h1>
                <h2 className="mt-3 text-sm font-normal">Proverite kasnije.</h2>
                <Link href="/">
                  <button className="mainButton mt-5">
                    Vrati se na početnu stranu
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {newProducts?.pagination?.total_pages > 1 &&
        process.env.PAGINATION_TYPE === "pagination" && (
          <CategoryPagination
            generateQueryString={(targetPage = page) => {
              const query_string = updateURLQuery(targetPage);
              return query_string;
            }}
            data={{
              pagination: newProducts.pagination,
            }}
            page={page}
            slug="/novo"
            setPage={setPage}
            getPaginationArray={getPaginationArray}
            withPagination={false}
          />
        )}
    </>
  );
};

export default NewProductsPage;
