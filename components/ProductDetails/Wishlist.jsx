import Image from "next/image";
import React, { useEffect } from "react";
import {
  useAddToWishlist,
  useIsInWishlist,
  useRemoveFromWishlist,
} from "@/hooks/ecommerce.hooks";

const Wishlist = ({ product, refreshWishlist }) => {
  const { mutate: addToWishlist, isSuccess: isAdded } = useAddToWishlist();

  const { mutate: removeFromWishlist, isSuccess: isRemoved } =
    useRemoveFromWishlist();

  const { data, refetch: reCheck } = useIsInWishlist({
    id: product?.basic_data?.id_product,
  });

  const isInWishlist = data?.exist;
  const wishlist_id = data?.wishlist_item_id;

  useEffect(() => {
    reCheck();
    if (isRemoved && refreshWishlist) {
      refreshWishlist();
    }
  }, [isAdded, isRemoved, refreshWishlist]);

  return (
    <div
      onClick={() => {
        if (isInWishlist) {
          removeFromWishlist({ id: wishlist_id });
        } else {
          addToWishlist({
            id: product?.basic_data?.id_product,
            name: product?.basic_data?.name,
          });
        }
      }}
    >
      {isInWishlist ? (
        <Image
          src={`/icons/bookmarkFill.svg`}
          alt="wishlist"
          width={39}
          height={39}
          className={`h-auto w-10 min-w-10`}
        />
      ) : (
        <Image
          src={"/icons/bookmark.svg"}
          alt="wishlist"
          width={39}
          height={39}
          className={`h-auto w-10 min-w-10`}
        />
      )}
    </div>
  );
};

export default Wishlist;
