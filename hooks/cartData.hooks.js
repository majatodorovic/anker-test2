"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get, list } from "@/api/api";

export const usePaymentOptions = () => {
  return useSuspenseQuery({
    queryKey: ["payment-options"],
    queryFn: async () => {
      return await get("/checkout/payment-options").then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });
};

export const useDeliveryOptions = () => {
  return useSuspenseQuery({
    queryKey: ["delivery-options"],
    queryFn: async () => {
      return await get("/checkout/delivery-options").then(
        (res) => res?.payload
      );
    },
    refetchOnWindowFocus: false,
  });
};

export const useRecommendedProducts = () => {
  return useSuspenseQuery({
    queryKey: ["recommended-products"],
    queryFn: async () => {
      return await list("/products/section/list/recommendation").then(
        (res) => res?.payload?.items
      );
    },
    refetchOnWindowFocus: false,
  });
};

export const useCountries = () => {
  return useSuspenseQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      return await get("/checkout/ddl/id_country").then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });
};
