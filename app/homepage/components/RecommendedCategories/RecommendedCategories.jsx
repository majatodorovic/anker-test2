"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const RecommendedCategories = ({ categories }) => {
  const [swiper, setSwiper] = useState(null);
  const [isFirstItem, setIsFirstItem] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);

  const handleSlideChange = (swiper) => {
    const realIndex = swiper.realIndex;
    setIsFirstItem(realIndex === 0);
  };

  const checkNavigation = (swiper) => {
    const slidesPerView = swiper.params.slidesPerView;
    const totalSlides = categories?.length || 0;
    setShowNavigation(totalSlides > slidesPerView);
  };

  return (
    <div className="sectionPaddingX marginBottomSection" data-aos="fade-up">
      <h2 className="titleH2 max-w-[520px]">
        Istražite najbolje proizvode{" "}
        <span className="font-semibold text-primary">Ankera</span> po
        kategorijama
      </h2>
      <div className="mt-14 md:mt-[100px]">
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
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            // 1680: {
            //   slidesPerView: 3.5,
            //   spaceBetween: 10,
            // },
          }}
        >
          {categories?.map((category) => {
            return (
              <Fragment key={category.id}>
                <Suspense
                  fallback={
                    <SwiperSlide className="aspect-2/3 h-full w-full animate-pulse bg-slate-300" />
                  }
                >
                  <SwiperSlide>
                    <Link
                      href={category?.slug_path}
                      className="hoveredColor group transition-all duration-500 ease-in-out"
                    >
                      <div className="h-[350px] border-b-4 border-primary bg-secondary transition-all duration-500 ease-in-out group-hover:bg-primary">
                        <div className="pl-8 pt-14 text-left text-[32px] font-light group-hover:text-white">
                          {category?.basic_data?.name}
                        </div>
                        {category?.images.icon && (
                          <div className="absolute bottom-2.5 right-2.5">
                            <Image
                              src={category?.images?.icon}
                              alt={category.basic_data?.name}
                              width={250}
                              height={250}
                              className="h-[250px] w-[250px] object-cover transition-all duration-500 ease-in-out group-hover:scale-105 max-sm:h-[180px] max-sm:w-[180px]"
                            />
                          </div>
                        )}

                        <div className="absolute bottom-7 left-10 flex items-center gap-1 transition-transform duration-500 group-hover:text-white">
                          <p className="font-light">Istražite</p>
                          <Image
                            src={"/icons/right-chevron.png"}
                            alt="Chevron"
                            width={16}
                            height={16}
                            className="mt-0.5 h-3 w-3 group-hover:invert"
                          />
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                </Suspense>
              </Fragment>
            );
          })}
          <div className="absolute right-0 top-0 z-50 h-full sm:shadow-white-glow-lg" />
          {showNavigation && (
            <>
              <div
                className={`slideNext !right-0 max-sm:!right-2 max-sm:!top-8`}
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
                className={`slidePrev !right-14 max-sm:!right-[64px] max-sm:!top-8 ${
                  isFirstItem ? "pointer-events-none opacity-0" : "opacity-100"
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
    </div>
  );
};

export default RecommendedCategories;
