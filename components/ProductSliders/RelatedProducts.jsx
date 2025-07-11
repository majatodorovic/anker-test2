"use client";
import { Fragment, Suspense, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRelatedProducts } from "@/hooks/ecommerce.hooks";
import ThumbByViewport from "@/components/Thumb/ThumbByViewport";
import Image from "next/image";

const RelatedProducts = ({ text = "Možda vam se svidi", id }) => {
  const { data: productDetails } = useRelatedProducts({ id });
  const [swiper, setSwiper] = useState(null);
  const [isFirstItem, setIsFirstItem] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);

  const handleSlideChange = (swiper) => {
    const realIndex = swiper.realIndex;
    setIsFirstItem(realIndex === 0);
  };
  const checkNavigation = (swiper) => {
    const slidesPerView = swiper.params.slidesPerView;
    const totalSlides = productDetails?.items?.length || 0;
    setShowNavigation(totalSlides > slidesPerView);
  };
  return (
    <>
      {productDetails?.items?.length > 0 && (
        <div data-aos="fade-up" className="sectionPaddingX mt-12 lg:mt-20">
          <div className="flex w-full items-center justify-between">
            <h5 className="text-3xl font-light">{text}</h5>
          </div>
          <div className="mt-[2.5rem] max-sm:mt-[1rem]">
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
              {productDetails?.items?.map(({ id }) => {
                return (
                  <Fragment key={id}>
                    <Suspense
                      fallback={
                        <SwiperSlide className="aspect-2/3 h-full w-full animate-pulse bg-slate-300" />
                      }
                    >
                      <SwiperSlide key={id} className="hoveredColor">
                        <ThumbByViewport
                          id={id}
                          apiLink={`/product-details/thumb/${id}?categoryId=*`}
                          light={true}
                        />
                      </SwiperSlide>
                    </Suspense>
                  </Fragment>
                );
              })}
              <div className="sm:shadow-white-glow-lg absolute right-0 top-0 z-50 h-full" />
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
        </div>
      )}
    </>
  );
};

export default RelatedProducts;
