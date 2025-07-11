"use client";
import { usePaymentOptions, useDeliveryOptions } from "@/hooks/cartData.hooks";
import { useSummary, useForm } from "@/hooks/ecommerce.hooks";
import { Suspense, useCallback, useState } from "react";
import { CheckoutData } from "@/components/Cart/CheckoutData";
import { CartWrapper } from "@/components/Cart/cart-wrapper";
import { CheckoutDataLoader } from "@/components/Cart/checkout-data-loader";

const CartContainer = ({ refreshCart, cartData }) => {
  const { data: payment_options } = usePaymentOptions();
  const { data: delivery_options } = useDeliveryOptions();

  const [token, setToken] = useState();
  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const formData = {
    customer_type_billing: "personal",
    first_name_shipping: "",
    last_name_shipping: "",
    phone_shipping: "",
    email_shipping: "",
    address_shipping: "",
    object_number_shipping: "",
    town_name_shipping: "",
    zip_code_shipping: "",
    id_country_shipping: "193",
    country_name_shipping: "Srbija",
    note_shipping: "",
    first_name_billing: "",
    last_name_billing: "",
    phone_billing: "",
    email_billing: "",
    address_billing: "",
    object_number_billing: "",
    town_name_billing: "",
    zip_code_billing: "",
    id_country_billing: "193",
    country_name_billing: "Srbija",
    note_billing: "",
    payment_method: "",
    delivery_method: null,
    note: "",
    gcaptcha: token,
    company_name_billing: null,
    pib_billing: null,
    maticni_broj_billing: null,
    floor_billing: null,
    apartment_number_billing: null,
    id_town_billing: null,
    id_municipality_billing: null,
    municipality_name_billing: null,
    id_company_shipping: null,
    id_company_address_shipping: null,
    company_name_shipping: null,
    pib_shipping: null,
    maticni_broj_shipping: null,
    floor_shipping: null,
    apartment_number_shipping: null,
    id_town_shipping: null,
    id_municipality_shipping: null,
    municipality_name_shipping: null,
    delivery_method_options: [],
    payment_method_options: [],
    promo_code: null,
    promo_code_options: [],
    accept_rules: false,
  };

  const {
    data: dataTmp,
    setData: setDataTmp,
    errors: errorsTmp,
    setErrors: setErrorsTmp,
  } = useForm(formData);

  //fetchujemo summary korpe (iznos,popuste,dostavu itd)
  const { data, refetch: refreshSummary } = useSummary({
    formData: dataTmp,
  });

  return (
    <CartWrapper
      data={data}
      cartCost={data?.summary?.total ?? 0}
      verifyCaptcha={verifyCaptcha}
    >
      <Suspense fallback={<CheckoutDataLoader />}>
        <CheckoutData
          delivery_options={delivery_options}
          payment_options={payment_options}
          items={cartData?.items}
          refreshSummary={refreshSummary}
          summary={data?.summary}
          refreshCart={refreshCart}
          dataTmp={dataTmp}
          setDataTmp={setDataTmp}
          errorsTmp={errorsTmp}
          setErrorsTmp={setErrorsTmp}
          totals={data?.summary?.totals}
          token={token}
        />
      </Suspense>
    </CartWrapper>
  );
};

export default CartContainer;
