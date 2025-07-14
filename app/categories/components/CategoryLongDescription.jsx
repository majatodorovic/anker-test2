"use client";

import { useCategory } from "@/hooks/ecommerce.hooks";
import React from "react";

export const CategoryLongDescription = ({ category_id }) => {
  const { data } = useCategory({ slug: category_id });

  if (data) {
    const {
      basic_data: { long_description },
    } = data;

    return (
      <div className={`prose !max-w-full`}>
        <div
          className="sectionPaddingX mt-10 font-light 2xl:text-xl"
          dangerouslySetInnerHTML={{ __html: long_description }}
        ></div>
      </div>
    );
  }
  return null;
};
