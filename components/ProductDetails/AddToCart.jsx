import { useRouter } from "next/navigation";
import { useAddToCart } from "@/hooks/ecommerce.hooks";
import {
  checkIsAddableToCart,
  cartTextBySelectedVariant,
} from "./helpers/addToCart";
import { Suspense } from "react";
import Wishlist from "./Wishlist";

const AddToCart = ({
  displayComponent,
  selectedOptions,
  productQuantity,
  productVariant,
  product,
  tempError,
  setTempError,
}) => {
  if (!displayComponent) return <></>;
  const router = useRouter();
  const { mutate: addToCart, isPending } = useAddToCart();

  const productItem = product?.data?.item;

  const isAddableToCart = checkIsAddableToCart({
    price: productVariant?.id ? productVariant?.price : productItem?.price,
    inventory: productVariant?.id
      ? productVariant?.inventory
      : productItem?.inventory,
  });

  const handleAddToCart = () => {
    switch (product?.product_type) {
      case "single": {
        let is_addable = checkIsAddableToCart({
          price: productItem?.price,
          inventory: productItem?.inventory,
        });
        if (is_addable?.addable) {
          addToCart({
            id: productItem?.basic_data?.id_product,
            quantity: productQuantity,
          });
          return true;
          // pushToDataLayer("add_to_cart", productItem, productQuantity);
        } else {
          router.push(
            `/kontakt?proizvodIme=${productItem?.basic_data.name}&proizvodId=${productItem?.id}`,
          );
        }
        break;
      }
      case "variant": {
        if (productVariant?.id) {
          let is_addable = checkIsAddableToCart({
            price: productVariant?.price,
            inventory: productVariant?.inventory,
          });

          if (is_addable?.addable) {
            addToCart({
              id: productVariant?.id,
              quantity: productQuantity,
            });
            return true;
            // pushToDataLayer("add_to_cart", productVariant, productQuantity);
          } else {
            router.push(
              `/kontakt?proizvodIme=${productItem?.basic_data.name}&proizvodId=${productVariant?.id}&atribut=${productVariant?.basic_data.attributes_text}`,
            );
          }
        } else {
          let text = cartTextBySelectedVariant({ selectedOptions, product });
          setTempError(text);
        }
        break;
      }
      default:
        break;
    }
    return false;
  };

  return (
    <div className="mt-14 flex items-center gap-3 max-sm:flex-col">
      <div className="flex w-full items-center gap-3">
        <button
          disabled={isPending}
          className={`mainButton w-full !bg-white !px-3 font-semibold !text-primary hover:!bg-primary hover:!text-white lg:max-w-[340px] xl:!py-4 xl:!text-lg`}
          onClick={() => {
            handleAddToCart();
          }}
        >
          {isPending
            ? "Dodajem..."
            : tempError
              ? tempError
              : isAddableToCart?.text}
        </button>
        {!isAddableToCart?.addable && (
          <Suspense
            fallback={
              <div className={`h-10 w-10 animate-pulse bg-slate-300`} />
            }
          >
            {product && <Wishlist product={product?.data?.item} />}
          </Suspense>
        )}
      </div>
      {isAddableToCart?.addable && !tempError && (
        <div className="flex w-full items-center gap-3">
          <button
            className={`mainButton w-full !px-3 font-semibold lg:max-w-[340px] xl:!py-4 xl:!text-lg`}
            onClick={() => {
              if (handleAddToCart()) {
                router.push("/korpa");
              }
            }}
          >
            Kupite odmah
          </button>
          <Suspense
            fallback={
              <div className={`h-10 w-10 animate-pulse bg-slate-300`} />
            }
          >
            {product && <Wishlist product={product?.data?.item} />}
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
