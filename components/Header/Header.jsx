"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import HeaderIcons from "./HeaderIcons";
import SearchProducts from "./SearchProducts";
import { usePathname } from "next/navigation";
import {
  useCategoryTree,
  useLandingPages,
  useNewProducts,
  useCategoryProducts,
} from "@/hooks/ecommerce.hooks";

const Header = () => {
  const { data: categories } = useCategoryTree();
  const { data: landingPagesList } = useLandingPages();
  const { data: newProducts } = useNewProducts(1, 10);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { data: categoryProducts } = useCategoryProducts({
    slug: hoveredCategory?.slug,
    limit: 6,
    sort: "new_desc",
    filterKey: null,
    render: hoveredCategory !== null,
  });

  const categoriesMain = [
    { name: "Početna", slug: "/", isCategory: false, id: 0 },
    ...(categories ? categories.slice(0, 6) : []),
    ...(newProducts?.items?.length > 0
      ? [
          {
            name: "Novo",
            slug: "/novo",
            isCategory: false,
          },
        ]
      : []),
    { name: "Sve kategorije", slug: "/sve-kategorije", isCategory: false },
    { name: "Akcija", slug: "/akcija", isCategory: false },
  ];

  const [activeCategory, setActiveCategory] = useState({
    open: false,
    id: null,
    name: null,
    slug: null,
    data: [],
    image: null,
  });

  const [activeSubCategory, setActiveSubCategory] = useState({
    open: false,
    id: null,
    name: null,
    slug_path: null,
    data: [],
    image: null,
  });

  const resetActiveCategory = () => {
    setActiveCategory({
      open: false,
      id: null,
      name: null,
      slug: null,
      data: [],
      image: null,
    });
    setActiveSubCategory({
      open: false,
      id: null,
      name: null,
      slug: null,
      data: [],
      image: null,
    });
    setHoveredCategory(null);
  };

  const [visible, setVisible] = useState("");
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY < 40)
        return setVisible(
          "sticky top-0 translate-y-0 transition-all duration-500",
        );
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        setVisible(
          "sticky top-0 -translate-y-full transition-all duration-500",
        );
        resetActiveCategory();
      } else {
        setVisible("sticky top-0 translate-y-0 transition-all duration-500");
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const pathname = usePathname();
  return (
    <>
      <header
        className={`max-xl:hidden ${visible} relative z-[100] mx-auto w-full bg-white`}
        id="header"
      >
        <HeaderTop />
        <div className="sectionPaddingX flex h-20 items-center justify-between gap-5">
          <div className="flex items-center gap-10">
            <Link href="/">
              <Image
                src="/images/logo/logo.svg"
                width={185}
                height={39}
                className="min-w-[100px] object-cover"
                alt="logo"
              />
            </Link>
            <div className={`flex items-center gap-4`}>
              {categoriesMain?.map((category, index) => {
                const isCategory = category?.isCategory ?? true;
                return isCategory ? (
                  category?.children ? (
                    <Link
                      href={`/${category?.link?.link_path}`}
                      key={index}
                      className={`${
                        category?.id === activeCategory?.id ||
                        pathname.includes(category?.slug)
                          ? "activeCategory after:-bottom-[30px]"
                          : "font-normal"
                      } activeCategoryHover relative block w-fit text-nowrap text-[13px] text-black hover:after:-bottom-[30px]`}
                      onMouseEnter={() => {
                        setActiveCategory({
                          id:
                            category?.id === activeCategory?.id
                              ? null
                              : category?.id,
                          name:
                            category?.name === activeCategory?.name
                              ? null
                              : category?.name,
                          slug:
                            category?.slug === activeCategory?.slug
                              ? null
                              : category?.slug,
                          data: category?.children ?? [],
                          image: category?.image ?? null,
                          open: true,
                        });
                        setHoveredCategory(category);
                      }}
                      onClick={resetActiveCategory}
                    >
                      {category?.name}
                    </Link>
                  ) : (
                    <Link
                      href={`/${category?.link?.link_path}`}
                      key={index}
                      onClick={() => resetActiveCategory()}
                      onMouseEnter={() => setHoveredCategory(category)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <span
                        className={`activeCategoryHover relative block w-fit text-[13px] font-semibold text-black hover:after:-bottom-[30px] ${
                          pathname?.includes(category?.slug) &&
                          category?.id !== 0
                            ? "activeCategory after:-bottom-[30px]"
                            : ""
                        }`}
                      >
                        {category?.name}
                      </span>
                    </Link>
                  )
                ) : (
                  <Link
                    href={`${category?.slug}`}
                    key={index}
                    onClick={resetActiveCategory}
                  >
                    <span
                      className={`activeCategoryHover relative block w-fit text-[13px] text-black hover:after:-bottom-[30px] ${(category?.name === "Novo" || category?.name === "Akcija") && "font-semibold text-primary"} ${
                        pathname?.includes(category?.slug) && category?.id !== 0
                          ? "activeCategory after:-bottom-[30px]"
                          : pathname === category?.slug && category?.id === 0
                            ? "activeCategory after:-bottom-[30px]"
                            : ""
                      }`}
                    >
                      {category?.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <SearchProducts />
            <div className="mx-[18px] h-4 w-[1px] bg-primary"></div>
            <HeaderIcons />
          </div>
        </div>
        {activeCategory?.open && (
          <div
            onMouseLeave={resetActiveCategory}
            className={`absolute right-0 top-[121px] z-[100] w-full bg-white max-lg:hidden`}
          >
            <div className="relative h-full px-20 pb-14 pt-8">
              <div className="flex h-full">
                <div
                  className={`flex w-[205px] flex-col items-start gap-1 pr-4`}
                >
                  {landingPagesList?.items?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        onClick={resetActiveCategory}
                        href={`/promo/${item?.slug}`}
                        className="block text-lg font-medium text-primary transition-all duration-300 hover:translate-x-5 hover:text-slate-500"
                      >
                        {item?.name}
                      </Link>
                    );
                  })}
                  {activeCategory?.data?.map((category, index) => (
                    <button
                      key={index}
                      className={`${
                        category?.id === activeSubCategory?.id ||
                        pathname.includes(category?.slug)
                          ? "text-primary"
                          : ""
                      } block text-left text-lg font-medium text-black hover:text-primary`}
                      onClick={() => {
                        setActiveSubCategory({
                          id: category?.id,
                          name: category?.name,
                          slug_path: category?.slug_path,
                          data: category?.children ?? [],
                          image: category?.image ?? null,
                          open: true,
                        });
                        setHoveredCategory(category);
                      }}
                    >
                      {category?.name}
                    </button>
                  ))}
                </div>
                {categoryProducts?.items?.length > 0 && (
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-1 text-sm">
                      <Link
                        href={`${hoveredCategory?.slug_path ?? activeCategory?.slug}`}
                        className="font-light hover:text-primary"
                        onClick={resetActiveCategory}
                      >
                        Pogledajte sve
                      </Link>
                      <Image
                        src={"/icons/right-chevron.png"}
                        alt="Chevron"
                        width={16}
                        height={16}
                        className="mt-0.5 h-3 w-3 group-hover:invert"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-5 2xl:grid-cols-3">
                      {categoryProducts.items.map((product) => (
                        <Link
                          key={product.id}
                          href={`${product.slug_path}`}
                          className="group flex h-[128px] w-[300px] items-center gap-5 bg-secondary pl-2 transition-all duration-300 ease-in-out hover:bg-primary 3xl:w-[350px]"
                          onClick={resetActiveCategory}
                        >
                          <Image
                            src={product.image[0] ?? "/images/placeholder.jpg"}
                            alt={product.basic_data.name}
                            width={100}
                            height={100}
                            className="ransition-all h-[90px] w-[90px] min-w-[90px] bg-secondary object-contain transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:bg-primary"
                          />
                          <h3 className="ransition-all mt-2 line-clamp-2 pr-4 text-lg font-light duration-300 ease-in-out group-hover:text-white">
                            {product.basic_data.name}
                          </h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="h-[1px] w-full bg-primary"></div>
      </header>
      <div
        onClick={() => {
          setActiveCategory({
            open: false,
            id: null,
            name: null,
            slug: null,
            data: [],
            image: null,
          });
        }}
        className={
          activeCategory?.open
            ? "visible fixed left-0 top-0 z-[99] h-screen w-screen bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500"
            : "invisible fixed left-0 top-0 z-[99] h-screen w-screen bg-black/50 opacity-0 backdrop-blur-md transition-all duration-500"
        }
      />
    </>
  );
};

export default Header;
