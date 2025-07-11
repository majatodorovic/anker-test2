import { get, list } from "@/api/api";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";
import RecommendedProducts from "./homepage/components/RecommendedProducts/RecommendedProducts";
import Slider from "./homepage/components/Slider/Slider";
import Benefits from "./homepage/components/Benefits/Benefits";
import RecommendedCategories from "./homepage/components/RecommendedCategories/RecommendedCategories";
import Banners from "./homepage/components/Banners/Banners";
import News from "./homepage/components/News/News";

const getSliders = () => {
  return get("/banners/index_slider").then((res) => res?.payload);
};
const getMobileSliders = () => {
  return get("/banners/index_slider_mobile").then((res) => res?.payload);
};
const getRecommendedProducts = () => {
  return list("/products/section/list/recommendation").then(
    (res) => res?.payload?.items,
  );
};
const getRecomendedCategories = () => {
  return list("/categories/section/recommended").then((res) => res?.payload);
};
const getBanners = () => {
  return get("/banners/banner").then((res) => res?.payload);
};
const getAllNews = async () => {
  return await list(`/news/category/list/all`).then(
    (res) => res?.payload?.items,
  );
};

const Home = async () => {
  const [sliders,  mobileSliders] =
    await Promise.all([
      getSliders(),
      getMobileSliders(),
    ]);
  const recommendedCategories = await getRecomendedCategories();
  const banners = await getBanners();
  const recommendedProducts = await getRecommendedProducts();
  const allNews = await getAllNews();

  let all_headers = headers();
  let base_url = all_headers.get("x-base_url");

  let schema = generateOrganizationSchema(base_url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="relative block overflow-hidden">
        <div className="relative block" id="slider">
          <Slider banners={sliders} mobileBanners={mobileSliders} />
        </div>
        <Benefits />
        {recommendedCategories && (
          <RecommendedCategories categories={recommendedCategories} />
        )}
        {banners && <Banners banners={banners} />}
        <div className="overflow-hidden">
          <RecommendedProducts
            recommendedProducts={recommendedProducts}
          />
        </div>
        <News news={allNews} />
      </div>
    </>
  );
};

export default Home;

export const revalidate = 30;

const getSEO = () => {
  return get("/homepage/seo").then((response) => response?.payload);
};

export const generateMetadata = async () => {
  const data = await getSEO();
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | Anker",
    description:
      data?.meta_description ?? "Dobrodošli na Anker Online Shop",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Početna | Anker",
      description:
        data?.social?.share_description ??
        "Dobrodošli na Anker Online Shop",
      type: "website",
      images: [
        {
          url: data?.social?.share_image ?? "https://www.ankersrbija.rs/images/logo/logo.svg",
          width: 800,
          height: 600,
          alt: "Anker",
        },
      ],
      locale: "sr_RS",
    },
  };
};
