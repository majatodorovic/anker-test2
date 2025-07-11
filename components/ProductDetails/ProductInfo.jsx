"use client";
import { Suspense, useState } from "react";
// import Specifications from "@/components/ProductDetails/Specifications";
import DigitalProductInfo from "@/components/ProductDetails/DigitalProductInfo";
import AddToCart from "@/components/ProductDetails/AddToCart";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import Variants from "@/components/Variants/Variants";
import PlusMinusInput from "@/components/PlusMinusInput";
import { getDataFromCurrentProduct } from "@/components/ProductDetails/helpers/productInfo";
import { ProductGallery } from "@/components/ProductDetails/ProductGallery";
import { currencyFormat } from "@/helpers/functions";
import { formatDate } from "@/helpers/convertDate";

export const ProductInfo = ({
  id,
  path,
  product,
  digitalProduct,
  productGallery,
}) => {
  const itemBasicData = product?.data?.item?.basic_data;
  const [productVariant, setProductVariant] = useState(null);
  const [tempError, setTempError] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const { behaviours, inventory, selectedProduct, sku, price } =
    getDataFromCurrentProduct({
      productVariant,
      product,
    });

  const discount_number = Math.abs(
    price?.price?.original - price?.price?.discount,
  );

  return (
    <div
      className="sectionPaddingX grid grid-cols-4 gap-x-10 2xl:grid-cols-7 2xl:gap-x-[70px]"
      data-aos="fade-up"
    >
      <ProductGallery
        productGallery={productGallery}
        variantKeyArray={productVariant?.variant_key_array}
        id={id}
      />

      <div className="col-span-4 lg:col-span-2 2xl:col-span-3">
        <div className="flex flex-col max-lg:mt-10">
          <Suspense fallback={<Loader />}>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-light lg:text-3xl 2xl:text-4xl">
                {itemBasicData?.name}
              </h1>
              <div className="h-[2px] w-[200px] bg-primary" />
            </div>
            <h2 className="mb-4 mt-3 text-base font-light lg:mb-10 lg:text-xl">
              {selectedProduct && sku ? `Šifra: ${sku}` : <>&nbsp;</>}
            </h2>
            <ProductPrice
              selectedProduct={selectedProduct}
              displayComponent={
                behaviours?.customer_settings?.product_price?.display_to_guest
              }
              is_details
              price={price}
              inventory={inventory}
              className={
                price?.discount?.active
                  ? `py-0.5 text-[21px] font-bold`
                  : `py-0.5 text-[1.172rem] font-bold`
              }
            />

            {price.discount.active && (
              <>
                <div className="mt-1 flex w-full flex-col">
                  <p className="mb-10 text-sm text-primary">
                    Ušteda: &nbsp;{currencyFormat(discount_number)}
                  </p>
                  <div className="my-1 h-[2px] w-full bg-[#d9d9d9]"></div>
                  <p className="text-right text-sm font-medium text-[#5b5b5c]">
                    Akcijska cena važi od:{" "}
                    {formatDate(price?.discount?.campaigns[0]?.duration?.from)}{" "}
                    do{" "}
                    {formatDate(
                      price?.discount?.campaigns[0]?.duration?.to,
                    )}{" "}
                  </p>
                </div>
              </>
            )}
            {itemBasicData?.short_description && (
              <div className={`mt-8 max-w-full text-base`}>
                <div className="mb-2">Glavne karakteristike:</div>
                <div className="font-light">
                  {itemBasicData?.short_description}
                </div>
              </div>
            )}
            <div
              className={`mt-10 flex gap-4 ${
                product?.data?.variant_options?.length === 1
                  ? "flex-row"
                  : "flex-col"
              }`}
            >
              <Variants
                setTempError={setTempError}
                displayComponent={product?.product_type === "variant"}
                firstVariantOption={!productVariant}
                product={product}
                productVariant={productVariant}
                setProductVariant={setProductVariant}
                productSlug={path}
                setSelectedOptions={setSelectedOptions}
                setQuantity={
                  behaviours
                    ? () =>
                        setProductQuantity(
                          behaviours?.cart?.default_loop_quantity,
                        )
                    : false
                }
              />
              <div className="w-full">
                <PlusMinusInput
                  label="Količina:"
                  displayComponent={behaviours?.cart?.display?.quantity_field}
                  behaviours={behaviours?.cart}
                  maxAmount={+inventory?.amount}
                  quantity={productQuantity}
                  setQuantity={setProductQuantity}
                  quantityError={() => {
                    if (
                      product?.product_type === "variant" &&
                      (!productVariant ||
                        (Array.isArray(productVariant) &&
                          productVariant.length == 0))
                    ) {
                      return "Izaberite varijantu";
                    }

                    if (inventory?.inventory_defined == false) {
                      return `${inventory?.status}`;
                    }

                    return false;
                  }}
                  isDetails
                />
              </div>
            </div>
          </Suspense>
        </div>

        <AddToCart
          displayComponent={
            behaviours?.customer_settings?.purchase?.allow_purchase_to_guest
          }
          selectedOptions={selectedOptions}
          productVariant={productVariant}
          productQuantity={productQuantity}
          product={product}
          tempError={tempError}
          setTempError={setTempError}
        />
        <DigitalProductInfo digital_product={digitalProduct} />
        {/* <Specifications id={id} /> */}
      </div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className={`mt-5`}>
      <div className={`h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-10 h-2 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-10 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
    </div>
  );
};
