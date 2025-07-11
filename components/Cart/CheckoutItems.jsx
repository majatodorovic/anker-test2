"use client";
import Image from "next/image";
import {
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "@/hooks/ecommerce.hooks";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/helpers/functions";
import PlusMinusInput from "@/components/PlusMinusInput";
import Link from "next/link";

const CheckoutItems = ({
  product,
  cart,
  refreshCart,
  refreshSummary,
  isClosed,
}) => {
  const { mutate: removeFromCart, isSuccess: isRemoved } = useRemoveFromCart();
  const { mutate: updateCart, isSuccess: isUpdated } = useUpdateCartQuantity();

  const {
    basic_data: { name, sku },
    price,
    inventory,
    image,
    link: { link_path: slug_path },
    behaviours: { checkout },
  } = product;

  const { quantity, cart_item_id } = cart;

  const [productQuantity, setProductQuantity] = useState(Number(quantity));

  useEffect(() => {
    if (Number(quantity) !== productQuantity) {
      updateCart({
        id: cart_item_id,
        quantity: productQuantity,
      });
    }
  }, [productQuantity]);

  useEffect(() => {
    setProductQuantity(Number(quantity));
  }, [quantity]);

  useEffect(() => {
    if (isUpdated || isRemoved) {
      refreshCart();
      refreshSummary();
    }
  }, [isRemoved, isUpdated]);

  return (
    <div
      className={`relative grid grid-cols-[110px_1fr] items-start justify-start gap-5 sm:grid-cols-[200px_1fr]`}
    >
      <button
        className={`absolute right-8 top-0 z-10 cursor-pointer font-semibold text-primary underline ${
          isClosed && !inventory?.inventory_defined && "text-white"
        } text-base hover:text-red-500`}
        onClick={() => {
          removeFromCart({ id: cart_item_id });
        }}
      >
        Izbrišite
      </button>
      <Link href={`/${slug_path}`} className="w-full">
        <Image
          src={image?.[0] ?? "/images/placeholder.jpg"}
          alt={`Comr`}
          width={0}
          height={0}
          sizes={`90vw`}
          className={`aspect-square w-full border border-white bg-white object-cover hover:object-contain`}
        />
      </Link>
      <div className={`mb-auto ml-2 flex flex-col items-start pr-12 pt-2`}>
        <h4
          className={`mb-2 line-clamp-2 pr-14 text-xl font-light 2xl:text-2xl`}
        >
          {name}
        </h4>
        <p className={`text-lg font-light`}>Šifra:&nbsp;{sku}</p>
        <PlusMinusInput
          label="Količina:"
          displayComponent={checkout.display.quantity_field}
          behaviours={checkout}
          maxAmount={+inventory?.amount}
          quantity={productQuantity}
          setQuantity={setProductQuantity}
          quantityError={() => {
            return false;
          }}
        />
        <p className={`mt-2 text-lg font-semibold`}>
          Cena:&nbsp;{currencyFormat(price?.per_item?.total)}
        </p>
      </div>
      {isClosed && !inventory?.inventory_defined && (
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black/40`}
        ></div>
      )}
    </div>
  );
};

export default CheckoutItems;
