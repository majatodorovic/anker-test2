"use client";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/api/api";

export const CategoryChildren = ({ slug }) => {
  const { data: categories } = useSuspenseQuery({
    queryKey: ["products", { slug }],
    queryFn: async () => {
      return await get(`/categories/product/tree/branch/parent/${slug}`).then(
        (response) => response?.payload,
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const currentSlug = categories?.slug;

  return (
    <div className="sectionPaddingX mb-14">
      <div className="flex w-full flex-wrap gap-4">
        {categories?.childrens &&
          (categories?.childrens ?? [])?.map((child) => (
            <div
              className="w-fit min-w-[180px] text-center max-sm:w-full"
              key={child?.id}
            >
              {currentSlug === child?.slug ? (
                <div className={`mainButton !px-4 !py-2`}>
                  <p className="">{child?.basic_data?.name}</p>
                </div>
              ) : (
                <Link href={`/${child?.link?.link_path}`}>
                  <div
                    className={`mainButton !bg-white !px-4 !py-2 !text-primary hover:!bg-primary hover:!text-white`}
                  >
                    <p className="">{child?.basic_data?.name}</p>
                  </div>
                </Link>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
