"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { Autoplay } from "swiper/modules";
import Aos from "aos";

function extractYoutubeId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regex);
  return match ? match[1] : null;
}

const RenderBanner = ({ banner }) => {
  switch (banner.type) {
    case "image": {
      return (
        <Image
          src={banner?.image ?? "/"}
          alt={banner?.title ?? "Alt"}
          width={0}
          height={0}
          sizes={`100vw`}
          className="h-auto w-full"
          priority
        />
      );
    }
    case "video_link": {
      const videoProvider = banner.video_provider;
      const videoUrl = banner.video_url;

      const src =
        videoProvider === "youtube"
          ? `https://www.youtube.com/embed/${extractYoutubeId(
              videoUrl,
            )}?autoplay=1&mute=1&loop=1&playsinline=1&controls=0&playlist=${extractYoutubeId(
              videoUrl,
            )}`
          : `${videoUrl}?autoplay=1&muted=1&loop=1&background=1&playsinline=1}`;

      return (
        <iframe
          className="pointer-events-none aspect-[960/1550] h-full w-full object-cover md:aspect-[1920/800]"
          width={banner.width}
          height={banner.height}
          src={src}
          style={{ border: "none" }}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }
    case "video": {
      return (
        <>
          <video
            key={banner?.file}
            width={banner?.file_data?.banner_position?.width}
            height={banner?.file_data?.banner_position?.height}
            className="h-full w-full bg-fixed object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            <source src={convertHttpToHttps(banner?.file)} type="video/mp4" />
            <source
              src={convertHttpToHttps(banner?.file.replace(".mp4", ".webm"))}
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </>
      );
    }
    default:
      break;
  }
};

const RenderSlider = ({ banners }) => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    swiperRef.current?.swiper.slideTo(index);
  };

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="relative h-auto">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop={banners.length > 1}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        className="h-full"
      >
        {banners?.map((banner, index) => (
          <SwiperSlide key={index} className="relative h-full">
            <RenderBanner banner={banner} />
            <Link
              href={banner?.url ?? "/"}
              target={banner?.target ?? "_self"}
              className="absolute left-0 top-0 z-[49] h-full w-full bg-black bg-opacity-0 transition-all duration-500"
            >
              <div className="absolute left-6 top-[200px] flex max-w-[320px] -translate-y-1/2 transform flex-col gap-5 text-left md:left-10 md:left-[70px] md:top-1/2">
                {banner?.title && (
                  <h1
                    className="text-base font-medium text-primary lg:text-lg"
                    dangerouslySetInnerHTML={{ __html: banner?.title }}
                  />
                )}
                {banner?.subtitle && (
                  <h2
                    className="text-3xl font-bold text-white md:text-black lg:text-4xl"
                    dangerouslySetInnerHTML={{ __html: banner?.subtitle }}
                  />
                )}
                {banner?.text && (
                  <p
                    className="text-base font-light text-white md:text-black lg:text-[17px]"
                    dangerouslySetInnerHTML={{ __html: banner?.text }}
                  ></p>
                )}
                {banner?.button && (
                  <button className="mainButton mt-7 max-w-[270px] md:mt-0 lg:mt-7">
                    {banner?.button}
                  </button>
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-3 left-10 z-[50] flex items-center gap-1 md:left-[70px] lg:bottom-6">
        {banners?.map((banner, index) => (
          <div
            key={index}
            className={`mx-1 flex h-1 w-[52px] cursor-pointer items-center justify-center`}
            onClick={() => handleSlideChange(index)}
          >
            <div
              className={`h-1 w-[52px] rounded-full ${
                currentSlide === index
                  ? "!h-1 !w-[52px] bg-primary"
                  : "bg-white"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderSlider;
