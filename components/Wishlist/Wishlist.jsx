"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useWishlist } from "@/hooks/ecommerce.hooks";
import { Thumb } from "@/components/Thumb/Thumb";
import BreadcrumbsStatic from "../BreadcrumbsStatic/BreadcrumbsStatic";

const WishlistPage = () => {
  const { data: wishlistData, isFetching, refetch } = useWishlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFetching) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isFetching]);

  return (
    <>
      {wishlistData?.length > 0 && (
        <BreadcrumbsStatic
          breadcrumbs={[{ name: "Lista želja" }]}
          title="Lista želja"
        />
      )}
      <div
        className={`sectionPaddingY mx-auto w-full ${wishlistData?.length > 0 && "bg-lightGray"}`}
      >
        <div className={`sectionPaddingX`}>
          {loading ? (
            <div
              className={`grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4`}
            >
              {Array.from({ length: 4 }, (_, i) => {
                return (
                  <div
                    key={i}
                    className={`aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
                  />
                );
              })}
            </div>
          ) : wishlistData?.length > 0 ? (
            <div
              className={`grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4`}
            >
              {wishlistData?.map(({ id_product: id }) => {
                return (
                  <Suspense
                    key={id}
                    fallback={
                      <div
                        className={`aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
                      />
                    }
                  >
                    <Thumb
                      slug={id}
                      key={id}
                      refreshWishlist={refetch}
                      withWishlist
                    />
                  </Suspense>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="border bg-lightGray p-10">
                <h1 className="text-lg font-medium">
                  Vaša lista želja je prazna!
                </h1>{" "}
                <p>
                  Kada dodate artikle u listu želja, oni će se pojaviti ovde.
                </p>
                <Link href="/">
                  <button className="mainButton mt-10">
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

export default WishlistPage;
