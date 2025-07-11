"use client";
import { Thumb } from "@/components/Thumb/Thumb";
import Link from "next/link";
import { useNewProducts } from "@/hooks/ecommerce.hooks";
import { Suspense } from "react";
import BreadcrumbsStatic from "../../../components/BreadcrumbsStatic/BreadcrumbsStatic";

const NewProductsPage = () => {
  const { data: newProducts } = useNewProducts(true);
  return (
    <>
      {newProducts?.items?.length > 0 && (
        <BreadcrumbsStatic
          breadcrumbs={[{ name: "Novo u ponudi" }]}
          title={"Novo u ponudi"}
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
    </>
  );
};

export default NewProductsPage;
