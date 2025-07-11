"use client";

import Image from "next/image";
import Link from "next/link";

const AllPosts = ({ posts }) => {
  return (
    <div data-aos="fade-up" className={`sectionPaddingX`}>
      <div
        className={`grid grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4`}
      >
        {posts?.map((post, index) => {
          const wordCount = post?.basic_data?.description?.split(" ").length;
          return (
            <div key={post?.id} className={`col-span-1 bg-secondary`}>
              <div className={`flex flex-col gap-3`}>
                <div
                  className={`relative h-[250px] w-full overflow-hidden md:h-[350px]`}
                >
                  <Link href={`/vesti/${post?.slug}`}>
                    <Image
                      src={post?.images?.thumb_image}
                      alt={post?.basic_data?.title || "Vesti Slika"}
                      width={0}
                      height={0}
                      sizes={`100vw`}
                      priority
                      className={`h-full w-full object-cover transition-all duration-500 hover:scale-105`}
                    />
                  </Link>
                  {index === 0 && (
                    <div className={`absolute right-2 top-2 shadow-md`}>
                      <div className={`bg-primary px-2.5 py-1`}>
                        <p className={`text-sm font-medium text-white`}>Novo</p>
                      </div>
                    </div>
                  )}
                  {wordCount > 0 && (
                    <div className={`absolute left-2 top-2`}>
                      <div className={`bg-black bg-opacity-[0.55] px-2.5 py-1`}>
                        <p className={`text-sm font-medium text-white`}>
                          {/*calculate read time*/}
                          {Math.ceil(wordCount / 238)} min čitanja
                        </p>
                      </div>
                    </div>
                  )}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-[0.55] py-2 text-center`}
                  >
                    <Link
                      href={`/vesti/${post?.slug}`}
                      className={`mx-auto line-clamp-1 max-w-[95%] text-[1.35rem] font-medium uppercase text-white md:text-[1.5rem]`}
                    >
                      {post?.basic_data?.title}
                    </Link>
                  </div>
                </div>
                {post?.basic_data?.short_description && (
                  <p className={`mx-2 line-clamp-3 text-sm`}>
                    {post?.basic_data?.short_description}
                  </p>
                )}
                <div
                  className={`flex justify-between px-2 pb-2 max-md:flex-col max-md:gap-3 md:flex-row`}
                >
                  <div className={`flex flex-row items-center gap-2`}>
                    <i className={`fa fa-solid fa-calendar-day`}></i>
                    <p className={`text-xs`}>
                      {new Date(post?.basic_data?.created_at?.date_time)
                        .toLocaleDateString("sr-RS", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                        .replace(/јануар/g, "januar")
                        .replace(/фебруар/g, "februar")
                        .replace(/март/g, "mart")
                        .replace(/април/g, "april")
                        .replace(/мај/g, "maj")
                        .replace(/јун/g, "jun")
                        .replace(/јул/g, "jul")
                        .replace(/август/g, "avgust")
                        .replace(/септембар/g, "septembar")
                        .replace(/октобар/g, "oktobar")
                        .replace(/новембар/g, "novembar")
                        .replace(/децембар/g, "decembar")}
                    </p>
                  </div>
                  <Link
                    href={`/vesti/${post?.slug}`}
                    className={`max-md:w-full`}
                  >
                    <button className={`mainButton flex items-center gap-4`}>
                      <span className={`text-sm`}>Saznajte više</span>
                      <i className={`fa fa-solid fa-arrow-right text-sm`}></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllPosts;
