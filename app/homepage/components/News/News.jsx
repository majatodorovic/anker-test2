"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";

const News = ({ news }) => {
  return (
    <div className="sectionPaddingX w-full" data-aos="fade-up">
      <div className="relative overflow-hidden pb-[180px] md:pb-[60px]">
        <div className="absolute left-0 top-[60px] h-full w-full bg-secondary"></div>
        <div className="flex">
          <div className="z-50 flex w-1/3 items-center bg-secondary pl-10 max-md:absolute max-md:bottom-12 max-md:left-0 max-md:w-full md:pl-[75px]">
            <div className="absolute left-0 top-0 h-[60px] w-1/3 bg-white max-md:hidden"></div>
            <div className="flex flex-col md:w-[300px]">
              <h2 className="titleH2 text-left">
                Saveti i novosti iz sveta{" "}
                <span className="font-semibold text-primary">punjača</span>
              </h2>
              <div className="relative mt-10 max-md:mb-4 max-md:mt-6">
                <button className="swiper-button-prev !top-0"></button>
                <button className="swiper-button-next !left-[40px] !top-0"></button>
              </div>
            </div>
          </div>
          <div className="relative w-2/3 max-md:w-full">
            <Swiper
              slidesPerView={1}
              loop={true}
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                },
                1680: {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                },
              }}
              className="relative !overflow-visible"
            >
              {news?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="group relative flex h-full flex-col overflow-hidden bg-secondary">
                    <div className="absolute left-0 top-0 z-10 h-1 w-full bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />{" "}
                    <Link
                      href={`/vesti/${item.slug}`}
                      className="relative aspect-square overflow-hidden"
                    >
                      <Image
                        src={item.images.thumb_image}
                        alt={item.basic_data.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col py-6 pr-6 max-md:pl-10">
                      <Link href={`/vesti/${item.slug}`}>
                        <h3 className="text-left text-xl font-light text-black transition-colors duration-300 hover:text-[#29ABE2]">
                          {item.basic_data.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
