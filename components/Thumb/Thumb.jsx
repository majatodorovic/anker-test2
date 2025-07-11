"use client";
import { forwardRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { useProductThumb } from "@/hooks/ecommerce.hooks";
import { truncateText } from "@/helpers/truncateText";
import noImage from "../../public/images/placeholder.jpg";
import Link from "next/link";
import Wishlist from "../ProductDetails/Wishlist";

export const Thumb = forwardRef(
  ({ slug, categoryId, light, withWishlist, refreshWishlist }, ref) => {
    const { data: product } = useProductThumb({
      slug: slug,
      id: slug,
      categoryId: categoryId ?? "*",
    });

    const variantOptionColor = product?.variant_options?.find((variant) => {
      return (
        variant?.attribute?.name === "boja" ||
        variant?.attribute?.name === "Boja" ||
        variant?.attribute?.name === "color" ||
        variant?.attribute?.name === "Color"
      );
    });

    const selected = variantOptionColor
      ? [
          {
            attribute_key: variantOptionColor.attribute.key,
            value_key: variantOptionColor.values[0].key,
          },
        ]
      : [];

    const imageList =
      product?.image.slice(0, 3).length > 0
        ? product.image.slice(0, 3)
        : variantOptionColor?.values
          ? variantOptionColor?.values
          : [{ product_image: noImage }];

    let link = `${product?.slug_path}`;

    selected.length > 0 &&
      product?.variant_options?.forEach((option) => {
        if (option.attribute.key === selected[0].attribute_key) {
          const currentColor = option.values.find(
            (value) => value.key === selected[0].value_key,
          );
          if (currentColor) link += `-${currentColor.slug}`;
        } else {
          link += `-${option.values[0].slug}`;
        }
      });

    const discount_number = Math.abs(
      product?.price?.min?.price?.original -
        product?.price?.min?.price?.discount,
    );
    const discount_percent = Math.ceil(
      (discount_number / product?.price?.min?.price?.original) * 100,
    );

    return (
      <div
        key={slug}
        className="group relative col-span-1 flex h-full flex-col items-stretch"
      >
        <div className={`relative !aspect-square w-full overflow-hidden`}>
          <div className="absolute left-0 top-0 z-10 h-1 w-full bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Swiper
            modules={[Navigation, Pagination]}
            rewind
            initialSlide={product?.image?.findIndex(
              (item) => item === product?.image[0],
            )}
            className={`categoryImageSwiper relative h-full w-full`}
          >
            {imageList?.map((item, index) => {
              let url;
              if (item) {
                if (
                  item.product_image &&
                  typeof item.product_image === "string"
                ) {
                  url = item.product_image;
                } else if (typeof item === "string") {
                  url = item;
                }
              }

              return (
                <SwiperSlide key={`${slug}-${index}`} className="!w-full">
                  <Link href={link} className="cursor-pointer">
                    <Image
                      ref={ref}
                      src={url ? convertHttpToHttps(url) : noImage}
                      alt={product?.basic_data?.name}
                      sizes={
                        "(max-width: 639px) 100vw, (max-width: 767px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (min-width: 1600px) 50vw"
                      }
                      width={0}
                      height={0}
                      fill
                      className={`h-full w-full object-cover transition-all duration-700 ease-in-out hover:scale-110 ${
                        light ? "!bg-secondary" : "!bg-white"
                      }`}
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {product?.price?.discount?.active ? (
            <div className="absolute right-5 top-5 z-[1] font-light text-white">
              <div className="bg-primary px-4 py-0.5 text-base 2xl:text-lg">
                -
                {(
                  ((product?.price?.price?.original -
                    product?.price?.price?.discount) /
                    product?.price?.price?.original) *
                  100
                ).toFixed(0)}
                %
              </div>
            </div>
          ) : product?.price?.min?.price?.original &&
            product.price?.min?.price?.discount ? (
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
              href={link}
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
            is_details={false}
          />
          <div className="flex items-center gap-2">
            <Link
              href={link}
              className="mainButton w-full !max-w-[230px] !py-2.5 text-center"
            >
              Saznajte više
            </Link>
            {withWishlist && (
              <Wishlist product={product} refreshWishlist={refreshWishlist} />
            )}
          </div>
        </div>
      </div>
    );
  },
);

Thumb.displayName = "Thumb";
