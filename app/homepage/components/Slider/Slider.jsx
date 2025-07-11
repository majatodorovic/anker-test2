import RenderSlider from "./RenderSlider";

const Slider = ({ banners, mobileBanners }) => {
  return (
    <div data-aos="fade-up" className="mx-auto max-w-[1920px]">
      <div className={`max-md:hidden`}>
        {banners && <RenderSlider banners={banners} />}
      </div>
      <div className={`md:hidden`}>
        {mobileBanners && <RenderSlider banners={mobileBanners} />}
      </div>
    </div>
  );
};

export default Slider;
