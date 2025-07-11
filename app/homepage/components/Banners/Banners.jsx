"use client";

import Image from "next/image";
import Link from "next/link";

const Banners = ({ banners }) => {
  const sortedBanners = [...banners].sort((a, b) => b.id - a.id).slice(0, 4);
  return (
    <div className="sectionPaddingX marginBottomSection" data-aos="fade-up">
      <h2 className="titleH2 max-w-[400px]">
        Uvek i svuda sa{" "}
        <span className="font-semibold text-primary">pametnim</span> uređajima
      </h2>
      <div className="mt-14 grid gap-9 md:mt-[100px] md:grid-cols-2">
        {sortedBanners.map((banner) => (
          <Link
            href={banner?.url ?? "/"}
            key={banner.id}
            className="group relative h-[490px] overflow-hidden 3xl:h-[640px]"
          >
            <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
            <Image
              src={banner.image}
              alt={banner.title}
              width={500}
              height={500}
              className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-8 left-7 z-50 flex h-auto w-[calc(100%-56px)] flex-col space-y-2">
              <h3 className="translate-y-0 text-3xl font-light leading-normal text-white transition-all duration-500 sm:translate-y-10 sm:group-hover:translate-y-0 lg:text-[40px]">
                {banner.title}
              </h3>
              <div className="translate-y-0 text-lg font-light text-white transition-all duration-500 sm:translate-y-10 sm:group-hover:translate-y-0 lg:text-[20px]">
                {banner.text}
              </div>
              <div className="mainButton !w-[270px] w-fit translate-y-0 text-center !text-sm opacity-100 transition-all duration-500 max-sm:!mt-5 sm:translate-y-10 sm:opacity-0 sm:group-hover:!mt-9 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                <span>{banner.button}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Banners;
