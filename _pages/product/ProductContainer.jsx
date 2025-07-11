"use client";
import { useEffect } from "react";
import { ProductInfo } from "@/components/ProductDetails/ProductInfo";
import Breadcrumbs from "@/components/ProductDetails/Breadcrumbs";
// import UpsellProducts from "@/components/ProductSliders/UpsellProducts";
// import CrosssellProducts from "@/components/ProductSliders/CrosssellProducts";
import RelatedProducts from "@/components/ProductSliders/RelatedProducts";
// import RecommendedProducts from "@/components/ProductSliders/RecommendedProducts";

const ProductContainer = ({
  digitalProduct,
  basic_data,
  product_gallery,
  path,
  category_id,
  id,
}) => {
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <Breadcrumbs id={id} categoryId={category_id} />

      <ProductInfo
        productGallery={product_gallery}
        path={path?.[path?.length - 1]}
        id={id}
        product={basic_data}
        digitalProduct={digitalProduct}
      />

      {/* <UpsellProducts id={id} />
      <CrosssellProducts id={id} />
      <RecommendedProducts id={id} /> */}
      <RelatedProducts id={id} />
    </>
  );
};

export default ProductContainer;
