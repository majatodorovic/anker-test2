"use client";

import PayPalWidget from "./PayPalWidget";
import { useSuspenseQuery } from "@tanstack/react-query";
import { post as POST } from "@/api/api";

const PayPalPage = ({ token }) => {
  const { data, isFetching } = useSuspenseQuery({
    queryKey: ["widget", token],
    queryFn: async () => {
      return await POST(
        `callback/checkout/paypal-widget?action=widget-options&order_id=${token}`
      ).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });

  let paymentOption;
  if (data && data?.widget_options) {
    paymentOption = data?.widget_options?.funding_sources[0] ?? "";
  }

  return (
    <div className="mx-auto px-[3%] flex items-center justify-center text-sm 4xl:container mt-[1rem] lg:mt-[6rem]">
      {isFetching ? (
        <i className={`fas fa-spinner fa-spin text-2xl`} />
      ) : (
        <div
          className={`flex flex-col items-center justify-center py-10 my-10 bg-[#f7f7f7] px-10 md:px-[15rem]`}
        >
          {renderText(paymentOption)}
          <PayPalWidget
            token={token}
            receivedData={data?.widget_options ?? []}
          />
        </div>
      )}
    </div>
  );
};

export default PayPalPage;

const renderText = (funding_source) => {
  switch (funding_source) {
    case "paypal":
      return (
        <>
          <h2 className={`text-[1.3rem] font-semibold text-center`}>
            Platite sa PayPal
          </h2>
          <p className={`text-center mt-10`}>
            Unesite svoje PayPal detalje klikom na
            <br /> &quot;Pay with PayPal&quot; i završiti kupovinu
          </p>
        </>
      );
    case "card":
      return (
        <>
          <h2 className={`text-[1.3rem] font-semibold text-center`}>
            Platite sa Kreditnom karticom
          </h2>
          <p className={`text-center mt-10`}>
            Unesite detalje svoje kreditne kartice klikom na
            <br /> &quot;Debit or Credit Card&quot; i završiti kupovinu
          </p>
        </>
      );
    case "eps":
      return (
        <>
          <h2 className={`text-[1.3rem] font-semibold text-center`}>
            Platite sa EPS
          </h2>
        </>
      );
    case "":
      return (
        <>
          <h2 className={`text-[1.3rem] font-semibold text-center`}>
            Opcije plaćanja
          </h2>
          <p className={`text-center mt-10`}>
            Molimo izaberite željenu opciju plaćanja
          </p>
        </>
      );
    default:
      return null;
  }
};
