"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";
import { useProducts } from "@/hooks/ecommerce.hooks";
import { Thumb } from "@/components/Thumb/Thumb";
import BrandsPagination from "./BrandsPagination";

const Brands = () => {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPageFromUrl = Number(searchParams.get("strana")) || 1;
  const [page, setPage] = useState(currentPageFromUrl);

  useEffect(() => {
    const urlPage = Number(searchParams.get("strana")) || 1;
    if (urlPage !== page) setPage(urlPage);
  }, [searchParams]);

  const { data } = useProducts({
    limit: 12,
    page: page,
    render: false,
    sort: { field: "", direction: "" },
    filters: [
      {
        column: "bn-i|brendovi",
        value: { selected: [slug.replace(/-/g, " ")] },
      },
    ],
  });

  const payload = data?.payload;

  const updateQueryString = (pageNumber) => {
    router.push(`?strana=${pageNumber}`, { scroll: false });
  };

  return (
    <>
      <BreadcrumbsStatic
        breadcrumbs={[{ name: slug, url: `/brend/${slug}` }]}
        title={`Brend - ${slug.charAt(0).toUpperCase() + slug.slice(1)}`}
      />
      <div className="mx-auto w-full bg-lightGray">
        <div className="sectionPaddingX sectionPaddingY">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {payload?.items.map((product) => (
              <Thumb slug={product.id} key={`thumb-${product.id}`} />
            ))}
          </div>
          {payload?.pagination && (
            <div className="mt-8 flex justify-center">
              <BrandsPagination
                pagination={payload?.pagination}
                setPage={(p) => {
                  setPage(p);
                  updateQueryString(p);
                  window.scrollTo(0, 0);
                }}
                handleQueryString={(page) => `?strana=${page + 1}`}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Brands;
