"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/ecommerce.hooks";
import { CartLoader } from "@/components/Cart/cart-loader";
import { CartNoItems } from "@/components/Cart/cart-no-items";
import CartContainer from "@/components/Cart/CartContainer";

export default function CartPage() {

  //fetchujemo sve artikle iz korpe
  const { data: cartData, refetch: refreshCart, isFetching } = useCart();
  const [successfullyFetched, setSuccessfullyFetched] = useState(false);
  useEffect(() => {
    if (!isFetching) {
      setSuccessfullyFetched(true);
    }
  }, [isFetching]);

  const renderCart = () => {
    switch (true) {
      case !successfullyFetched:
        return <CartLoader />;
      case cartData?.items?.length > 0 && successfullyFetched:
        return <CartContainer refreshCart={refreshCart} cartData={cartData} />;
      case cartData?.items?.length === 0 && successfullyFetched:
        return <CartNoItems />;
      default:
        return <CartLoader />;
    }
  };

  return (
    <div className="mx-auto ">
      {renderCart()}
    </div>
  );
}
