"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { FreeMode, Navigation, Pagination, Thumbs, Zoom } from "swiper/modules";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { useSearchParams } from "next/navigation";
import { getCurrentGalleryByVariantKeys } from "@/components/ProductDetails/helpers/gallery";

export const ProductGallery = ({ productGallery, variantKeyArray }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState(
    productGallery?.gallery.length > 0
      ? productGallery?.gallery
      : [
          {
            image: "/images/placeholder.jpg",
          },
        ],
  );

  useEffect(() => {
    if (variantKeyArray) {
      const currentGallery = variantKeyArray
        ? getCurrentGalleryByVariantKeys({
            variantKeys: variantKeyArray,
            productGallery,
          })
        : [];

      if (currentGallery.length > 0) {
        setGallery(currentGallery);
      }
    }
  }, [variantKeyArray]);

  const params = useSearchParams();
  const color = params?.get("color");

  function ImageMagnifier({
    src,
    magnifierHeight = 300,
    magnifierWidth = 300,
    zoomLevel = 2.5,
    onClick = () => {},
  }) {
    const [[x, y], setXY] = useState([0, 0]);

    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);

    const [showMagnifier, setShowMagnifier] = useState(false);

    return (
      <div
        style={{
          position: "relative",
          zIndex: 100,
        }}
        className="aspect-square h-full w-full object-cover"
        onClick={onClick}
      >
        <Image
          src={src}
          width={0}
          height={0}
          ref={mainSliderRef}
          sizes={`(max-width: 768px) 100vw, (min-width: 1200px) 70vw`}
          priority={true}
          className="!h-full w-full bg-secondary !object-cover"
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          alt={`Croonus Shop`}
        />

        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: "1",
            border: "1px solid lightgray",
            borderRadius: "50%",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
      </div>
    );
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const productImage = gallery?.map((image, index) => {
    return (
      <SwiperSlide
        key={index}
        className="relative w-full overflow-hidden border border-secondary bg-secondary"
      >
        <ImageMagnifier
          src={convertHttpToHttps(image?.image)}
          onClick={() => {
            setModalImage(image?.image);
          }}
          className="bg-secondary"
        />
      </SwiperSlide>
    );
  });
  const thumbImage = gallery?.map((image, index) => {
    return (
      <SwiperSlide
        key={`${index}-thumbImage`}
        className={`!aspect-square max-w-[120px] !overflow-hidden border border-secondary bg-secondary`}
      >
        <Image
          src={convertHttpToHttps(image?.image)}
          alt={image?.image_data?.description?.alt || "Croonus Shop"}
          width={120}
          height={120}
          priority={true}
          sizes={`(max-width: 768px) 100vw, (min-width: 1200px) 70vw`}
          className={`!h-full w-full cursor-pointer !object-cover max-md:hidden ${
            activeIndex === index
              ? "border border-black bg-white"
              : "bg-secondary opacity-60"
          }`}
        />
      </SwiperSlide>
    );
  });

  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (color) {
      setLoading(true);
      const newImages = productGallery?.gallery?.filter((item) =>
        item?.variant_key?.includes(color),
      );

      const nonVariantImages = productGallery.gallery?.filter(
        (item) => item?.variant_key_array?.length === 0,
      );

      setGallery([...newImages, ...nonVariantImages]);
    }
    if (productGallery?.gallery?.length) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [color]);

  const mainSliderRef = useRef(null);

  useEffect(() => {
    const updateMainSliderHeight = () => {
      if (mainSliderRef.current) {
        const thumbsSwiper = document.getElementById("thumbsSwiper");
        thumbsSwiper.style.height = `${mainSliderRef.current.clientHeight}px`;
      }
    };

    updateMainSliderHeight();

    window.addEventListener("resize", updateMainSliderHeight);
    return () => {
      window.removeEventListener("resize", updateMainSliderHeight);
    };
  }, []);

  return (
    <div className="col-span-4 h-fit gap-10 overflow-hidden md:flex md:flex-col lg:col-span-2 2xl:col-span-4">
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        pagination={true}
        modules={[FreeMode, Thumbs, Pagination, Navigation]}
        initialSlide={0}
        navigation={false}
        rewind={true}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className={`!relative !aspect-square h-full w-full`}
        breakpoints={{
          768: {
            direction: "horizontal",
            slidesPerView: 1,
            pagination: {
              el: ".swiper-pagination",
              enabled: false,
            },
            navigation: {
              enabled: true,
            },
            modules: [FreeMode, Thumbs, Navigation],
          },
          0: {
            direction: "vertical",
            slidesPerView: 1,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
              enabled: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            },
            navigation: {
              el: ".swiper-nav-button",
              clickable: true,
              enabled: false,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            },
            modules: [FreeMode, Thumbs, Pagination],
          },
        }}
      >
        {loading ? (
          <SwiperSlide>
            <div className="aspect-square h-full w-full animate-pulse bg-gray-200"></div>
          </SwiperSlide>
        ) : (
          <>{productImage}</>
        )}
        <div className={`absolute right-2 top-2 z-50 flex flex-col gap-1`}>
          {productGallery?.stickers?.length > 0 &&
            productGallery?.stickers?.map((sticker, stickerIndex) => {
              return (
                <div
                  key={`stickerIndex-${stickerIndex}`}
                  className={`bg-primary px-[0.85rem] py-1 text-[13px] font-bold`}
                >
                  <span className={`text-[0.75rem] text-white`}>
                    {sticker?.name}
                  </span>
                </div>
              );
            })}
        </div>
      </Swiper>
      <div className="relative max-md:hidden">
        <Swiper
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
          spaceBetween={10}
          id={`thumbsSwiper`}
          slidesPerView={0}
          breakpoints={{
            320: {
              direction: "horizontal",
              slidesPerView: 0,
              thumbs: {
                enabled: false,
              },
              modules: [],
            },
            768: {
              direction: "horizontal",
              slidesPerView: 4,
              enabled: true,
            },
            1024: {
              direction: "horizontal",
              slidesPerView: 2,
              enabled: true,
            },
            1280: {
              direction: "horizontal",
              slidesPerView: 3,
            },
            1600: {
              direction: "horizontal",
              slidesPerView: 4,
            },
          }}
          className="max-h-[120px] max-md:hidden md:w-[510px] lg:w-[250px] xl:w-[380px] 2xl:w-[510px]"
        >
          {thumbImage}
        </Swiper>
        <div
          slot="container-start"
          className={`slideNext !right-10 3xl:!right-24 ${
            gallery?.length > swiper?.params?.slidesPerView ? `block` : `hidden`
          } `}
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
          className={`slidePrev !left-10 3xl:!left-24 ${
            gallery?.length > swiper?.params?.slidesPerView ? `block` : `hidden`
          } `}
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
      </div>
      {modalImage && (
        <div
          className={`fixed left-0 top-0 z-[999999] flex h-full w-full items-center justify-center bg-black/80 md:hidden`}
        >
          <div className="relative h-full w-full">
            <Swiper
              modules={[Pagination, Zoom]}
              pagination={true}
              direction={"vertical"}
              zoom={{
                maxRatio: 2.5,
                toggle: true,
                minRatio: 1,
              }}
              initialSlide={gallery?.findIndex(
                (item) => item?.image === modalImage,
              )}
              className={`modalSwiper swiper-zoom-container h-full w-full`}
              breakpoints={{
                0: {
                  direction: "vertical",
                  slidesPerView: 1,
                  pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    enabled: true,
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                  },
                },
              }}
            >
              {gallery?.map((image, index) => {
                return (
                  <SwiperSlide
                    key={`${index}-product-image-first-swiper`}
                    className="w-full"
                  >
                    <div className="swiper-zoom-container">
                      <Image
                        src={image?.image}
                        alt={
                          image?.image_data?.description?.alt || "Croonus shop"
                        }
                        fill
                        sizes="100vw"
                        objectFit="cover"
                        priority={true}
                        className="h-auto w-full cursor-pointer"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <i
            className={`fas fa-times absolute left-2 top-2 z-50 cursor-pointer rounded-xl bg-white px-2 py-1 text-xl text-[#e10000]`}
            onClick={() => {
              setModalImage(null);
            }}
          ></i>
        </div>
      )}
    </div>
  );
};
