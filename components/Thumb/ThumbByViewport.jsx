"use client";

import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { get as GET } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { truncateText } from "@/helpers/truncateText";
import noImage from "../../public/images/placeholder.jpg";

const ThumbByViewport = ({ id, is_details = false, apiLink, light }) => {
  const [isInView, setIsInView] = useState(false);
  const thumbRef = useRef(null);

  //IntersectionObserver for visibility detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 },
      );

      if (thumbRef.current) {
        observer.observe(thumbRef.current);
      }

      return () => {
        if (thumbRef.current) {
          observer.unobserve(thumbRef.current);
        }
      };
    }
  }, []);

  const { data: product } = useQuery({
    queryKey: ["productThumbByViewport", id],
    queryFn: async () => {
      return await GET(apiLink).then((res) => {
        return res?.payload;
      });
    },
    enabled: isInView,
    refetchOnWindowFocus: false,
  });

  const discount_number = Math.abs(
    product?.price?.min?.price?.original - product?.price?.min?.price?.discount,
  );
  const discount_percent = Math.ceil(
    (discount_number / product?.price?.min?.price?.original) * 100,
  );

  const imageList =
    product?.image_data?.length > 0
      ? product.image_data
      : [
          {
            url: noImage,
            descriptions: { alt: "No Image" },
            file_data: { width: 800, height: 800 },
          },
        ];

  return (
    <div
      ref={thumbRef}
      className="group relative col-span-1 flex h-full flex-col items-stretch"
    >
      <div className={`relative !aspect-square w-full overflow-hidden`}>
        <div className="absolute left-0 top-0 z-10 h-1 w-full bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Swiper
          modules={[Navigation, Pagination]}
          rewind
          className="categoryImageSwiper relative hidden h-full w-full md:block"
        >
          {imageList.map(
            (
              { url, descriptions: { alt }, file_data: { height, width } },
              index,
            ) => (
              <SwiperSlide key={index} className="!relative !overflow-hidden">
                <Link
                  href={`/${product?.link?.link_path}`}
                  className="cursor-pointer"
                >
                  <Image
                    ref={thumbRef}
                    loading="lazy"
                    src={url === noImage ? url : convertHttpToHttps(url ?? "")}
                    alt={alt ?? product?.basic_data?.name}
                    sizes="(max-width: 639px) 100vw, (max-width: 767px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (min-width: 1600px) 50vw"
                    width={width ?? 0}
                    height={height ?? 0}
                    className={`h-full w-full object-cover transition-all duration-700 ease-in-out hover:scale-110 ${
                      light ? "!bg-secondary" : "!bg-white"
                    }`}
                  />
                </Link>
              </SwiperSlide>
            ),
          )}
        </Swiper>
        {product?.price?.discount?.active ? (
          <div className="absolute right-5 top-5 z-[1] font-light text-white">
            {product?.price?.discount?.campaigns?.map(
              ({ calc: { original, price } }, index) => {
                const discount = Math.round(
                  ((Number(original) - Number(price)) / Number(original)) * 100,
                );
                return (
                  <div
                    key={index}
                    className="bg-primary px-4 py-0.5 text-base 2xl:text-lg"
                  >
                    -{discount}%
                  </div>
                );
              },
            )}
          </div>
        ) : product?.price?.min?.price?.original &&
          product?.price?.min?.price?.discount ? (
          <div className="absolute right-5 top-5 z-[1] font-light text-white">
            <div className="bg-primary px-4 py-0.5 text-base 2xl:text-lg">
              -{discount_percent}%
            </div>
          </div>
        ) : null}
        {product?.stickers?.length > 0 && (
          <div
            className={`absolute left-5 top-5 z-[1] flex flex-col gap-2 text-center text-white`}
          >
            {product?.stickers?.map((sticker, index) => (
              <div
                className={`bg-primary px-2 py-0.5 text-base font-light 2xl:px-4 2xl:text-lg`}
                key={index}
              >
                {sticker?.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className={`z-[50] flex flex-col gap-3 px-6 pb-6 pt-2 ${
          light ? "!bg-secondary" : "!bg-white"
        }`}
      >
        <div className="relative mb-1 flex items-center justify-start">
          <Link
            href={`/${product?.link?.link_path}`}
            className="relative cursor-pointer max-sm:line-clamp-1 sm:line-clamp-2"
          >
            <h3
              className="h-[60px] text-left text-[20px] font-light transition-colors duration-300 group-hover:text-primary"
              title={
                product?.basic_data?.name.length > 63
                  ? product?.basic_data?.name
                  : ""
              }
            >
              {truncateText(product?.basic_data?.name)}
            </h3>
          </Link>
        </div>
        <div className="mb-2 line-clamp-2 h-[45px] text-left text-[15px] font-light text-[#515151]">
          {product?.basic_data?.short_description}
        </div>
        <ProductPrice
          price={product?.price}
          inventory={product?.inventory}
          is_details={is_details}
        />
        <Link
          href={`/${product?.link?.link_path}`}
          className="mainButton w-full !max-w-[230px] !py-2.5 text-center"
        >
          Dodajte u korpu
        </Link>
      </div>
    </div>
  );
};

export default ThumbByViewport;
