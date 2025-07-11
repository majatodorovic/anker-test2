"use client";
import Link from "next/link";
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/api/api";
import { Suspense } from "react";

const Breadcrumbs = ({ id, categoryId }) => {
  const { data: breadcrumbs } = useSuspenseQuery({
    queryKey: ["breadcrumbs", id],
    queryFn: async () => {
      return await get(
        `/product-details/breadcrumbs/${id}?categoryId=${categoryId ?? "*"}`,
      ).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Suspense
      fallback={<div className={`h-2 w-full animate-pulse bg-slate-300`} />}
    >
      <div data-aos="fade-right" className="sectionPaddingX w-full bg-white">
        <div className="mb-20 flex items-center gap-2 overflow-x-auto pb-2 pt-10">
          <Link href={`/`} className={`text-base font-light`}>
            Početna
          </Link>
          {(breadcrumbs?.steps ?? [])?.map((breadcrumb) => {
            return (
              <div className="flex" key={breadcrumb?.id}>
                <span className="mr-2 text-base">/</span>
                <Link
                  href={`/${breadcrumb?.link?.link_path}`}
                  className={`whitespace-nowrap font-light`}
                >
                  {breadcrumb?.name}
                </Link>
              </div>
            );
          })}
          <span className="mr-2 text-base">/</span>
          <div
            className={`whitespace-nowrap font-light text-primary underline`}
          >
            {breadcrumbs?.end?.name}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Breadcrumbs;
