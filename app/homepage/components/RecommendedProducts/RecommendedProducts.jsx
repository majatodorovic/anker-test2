"use client";
import { Suspense, useEffect, useState } from "react";
import { Thumb } from "@/components/Thumb/Thumb";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const RecommendedProducts = ({ recommendedProducts }) => {
  const getFirstUniqueCategoryId = () => {
    for (const category of recommendedProducts) {
      const uniqueCategories = category?.categories?.filter(
        (item, index, arr) =>
          arr.findIndex((el) => el.name === item.name) === index,
      );
      if (uniqueCategories && uniqueCategories[0]?.id) {
        return uniqueCategories[0].id;
      }
    }
    return null;
  };

  const [selectedCategory, setSelectedCategory] = useState(
    getFirstUniqueCategoryId(),
  );

  const [products, setProducts] = useState(() => {
    const firstId = getFirstUniqueCategoryId();
    if (!firstId) return recommendedProducts;
    return recommendedProducts.filter(
      (item) => item?.categories[0]?.id === firstId,
    );
  });
  const [swiper, setSwiper] = useState(null);
  const [isFirstItem, setIsFirstItem] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);

  const handleSlideChange = (swiper) => {
    const realIndex = swiper.realIndex;
    setIsFirstItem(realIndex === 0);
  };
  const checkNavigation = (swiper) => {
    const slidesPerView = swiper.params.slidesPerView;
    const totalSlides = recommendedProducts?.length || 0;
    setShowNavigation(totalSlides > slidesPerView);
  };
  const uniqueNames = [];
  const uniqueIds = [];
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recommendedProducts) {
      setLoading(false);
    }
  }, [recommendedProducts]);

  return (
    <div className="sectionPaddingX marginBottomSection">
      <h2 className={`titleH2 max-w-[440px]`}>
        Izdvajamo{" "}
        <span className="font-semibold text-primary">“Must have”</span> Anker
        proizvode
      </h2>
      <div className="relative mt-14 flex flex-col justify-between border-[#B8B5B5] pb-1 max-lg:gap-3 md:mt-[100px] lg:flex-row lg:items-center lg:border-b">
        {!pathname.includes("korpa") && (
          <>
            <div className="flex flex-row flex-wrap items-center gap-8 max-lg:hidden">
              {recommendedProducts?.map((category) => {
                const uniqueCategories = category?.categories?.filter(
                  (item, index, arr) =>
                    arr.findIndex((el) => el.name === item.name) === index,
                );

                if (uniqueNames.includes(uniqueCategories[0]?.name)) {
                  return null;
                } else {
                  uniqueNames.push(uniqueCategories[0]?.name);
                  return (
                    <div className="" key={category.id}>
                      <button
                        className={
                          selectedCategory === uniqueCategories[0]?.id
                            ? `activeCategoryHover active-button activeCategory relative w-fit text-lg font-normal text-black`
                            : `activeCategoryHover relative w-fit text-lg font-normal text-black`
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          let newProducts = [...recommendedProducts];
                          newProducts = recommendedProducts?.filter((item) => {
                            return (
                              item?.categories[0]?.id ===
                              uniqueCategories[0]?.id
                            );
                          });
                          setProducts(newProducts);
                          setSelectedCategory(uniqueCategories[0]?.id);
                        }}
                      >
                        {uniqueCategories[0]?.name}
                      </button>
                    </div>
                  );
                }
              })}
            </div>
            <div className="lg:hidden">
              <select
                onChange={(e) => {
                  let newProducts = [...recommendedProducts];
                  newProducts = recommendedProducts?.filter((item) => {
                    return item?.categories[0]?.id === Number(e.target.value);
                  });
                  setProducts(newProducts);
                }}
                className="w-full border border-gray-400 text-black focus:border-gray-400 focus:outline-0 focus:ring-0 max-md:text-[0.9rem]"
              >
                {recommendedProducts?.map((category, index) => {
                  const uniqueCategories = category?.categories?.filter(
                    (item, index, arr) =>
                      arr.findIndex((el) => el.name === item.name) === index,
                  );

                  if (uniqueCategories.length === 0) return null;

                  if (uniqueIds.includes(uniqueCategories[0]?.id)) {
                    return null;
                  } else {
                    uniqueIds.push(uniqueCategories[0]?.id);
                    return (
                      <option
                        key={index}
                        value={Number(uniqueCategories[0]?.id)}
                        className={`max-md:text-[0.9rem]`}
                      >
                        {uniqueCategories[0]?.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          </>
        )}
      </div>
      {!loading && (
        <div className="mt-10 md:mt-[70px]">
          <Swiper
            onSwiper={(swiper) => {
              setSwiper(swiper);
              setIsFirstItem(swiper.realIndex === 0);
              checkNavigation(swiper);
            }}
            onBreakpoint={(swiper) => {
              checkNavigation(swiper);
            }}
            onSlideChange={handleSlideChange}
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
            }}
          >
            {products?.map(({ id }) => {
              return (
                <SwiperSlide key={id} className="hoveredColor">
                  <Suspense
                    fallback={
                      <div
                        key={id}
                        className="aspect-2/3 h-full w-full animate-pulse bg-slate-300"
                      />
                    }
                  >
                    <Thumb id={id} slug={id} light />
                  </Suspense>
                </SwiperSlide>
              );
            })}
            <div className="absolute right-0 top-0 z-50 h-full sm:shadow-white-glow-lg" />
            {showNavigation && (
              <>
                <div
                  className={`slideNext !right-0`}
                  onClick={() => {
                    swiper?.slideNext();
                  }}
                >
                  <Image
                    src="/icons/chevron-right.png"
                    alt="chevron-right"
                    width={24}
                    height={24}
                  />
                </div>
                <div
                  className={`slidePrev !left-0 sm:!left-auto sm:!right-14 ${
                    isFirstItem
                      ? "pointer-events-none opacity-0"
                      : "opacity-100"
                  }`}
                  onClick={() => {
                    swiper?.slidePrev();
                  }}
                >
                  <Image
                    src="/icons/chevron-left.png"
                    alt="chevron-left"
                    width={24}
                    height={24}
                  />
                </div>
              </>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default RecommendedProducts;
