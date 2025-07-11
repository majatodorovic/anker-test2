"use client";
import Image from "next/image";
import { Swiper as Slider, SwiperSlide as Slide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

const SinglePost = ({ post }) => {
  const blogGallery = [
    ...(post?.images?.thumb_image ? [post.images.thumb_image] : []),
    ...(Array.isArray(post?.gallery) ? post.gallery : []),
  ];

  return (
    <div
      data-aos="fade-up"
      className="sectionPaddingX relative flex gap-8 max-xl:flex-col"
    >
      <section className={`flex w-full flex-1 flex-col gap-3`}>
        <p className={`w-fit bg-primary px-2 text-base font-light text-white`}>
          {new Date(post?.basic_data?.created_at?.date_time).toLocaleDateString(
            "sr-RS",
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            },
          )}
        </p>
        <div
          className={`prose !max-w-full text-base`}
          dangerouslySetInnerHTML={{ __html: post?.basic_data?.description }}
        />
      </section>
      <Slider
        modules={[Navigation]}
        navigation
        className="blogSlider relative aspect-[14/9] flex-1 max-xl:h-auto max-xl:w-full"
        watchSlidesProgress
      >
        {blogGallery?.map((image, index) => {
          return (
            <Slide key={index} className={`overflow-hidden`}>
              <div className={`relative`}>
                <Image
                  src={image}
                  alt={post?.basic_data?.title || "Slika Bloga"}
                  width={0}
                  height={0}
                  sizes={`100vw`}
                  priority
                  className={`aspect-[14/9] h-full w-full bg-fixed object-cover`}
                />
              </div>
            </Slide>
          );
        })}
      </Slider>
    </div>
  );
};

export default SinglePost;
