"use client";
import { Thumb } from "@/components/Thumb/Thumb";
import Link from "next/link";
import { useNewProducts } from "@/hooks/ecommerce.hooks";
import { Suspense } from "react";
import BreadcrumbsStatic from "../../../components/BreadcrumbsStatic/BreadcrumbsStatic";

const ActionProductsPage = ({ actionProducts }) => {
  return (
    <>
      {actionProducts?.length > 0 && (
        <BreadcrumbsStatic
          breadcrumbs={[{ name: "Akcija" }]}
          title={"Akcija"}
        />
      )}
      <div
        className={`sectionPaddingY mx-auto w-full ${actionProducts?.length > 0 && "bg-lightGray"}`}
      >
        <div className={`sectionPaddingX`}>
          {actionProducts?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-x-5 gap-y-[20px] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {actionProducts?.map(({ id }) => {
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
                  Trenutno nema akcijskih proizvoda.
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

export default ActionProductsPage;
