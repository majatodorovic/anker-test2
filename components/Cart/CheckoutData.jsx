"use client";
import { useContext, useEffect, useState } from "react";
import {
  useBillingAddresses,
  useCheckout,
  useGetAddress,
  useIsLoggedIn,
  useGetAccountData,
  useCartBadge,
} from "@/hooks/ecommerce.hooks";
import { handleCreditCard, handleSetData } from "@/components/Cart/functions";
import { useRouter } from "next/navigation";
import CheckoutUserInfo from "@/components/Cart/CheckoutUserInfo";
import CheckoutOptions from "@/components/Cart/CheckoutOptions";
import CheckoutTotals from "@/components/Cart/CheckoutTotals";
import CheckoutItems from "@/components/Cart/CheckoutItems";
import Spinner from "@/components/UI/Spinner";
import { userContext } from "@/context/userContext";
import CheckoutButton from "@/components/Cart/CheckoutButton";
import NoStockModal from "@/components/Cart/NoStockModal";
import GeneralTermsOfUseField from "@/components/Cart/GeneralTermsOfUseField";
import { filterOutProductsOutOfStock } from "@/components/Cart/helper/outOfStock";
import { useForm, useLogin } from "@/hooks/ecommerce.hooks";
import {
  Form,
  handleInputChange,
  handleSubmit,
} from "@/_components/shared/form";

const fields = [
  {
    id: 1,
    name: "email",
    placeholder: "Unesite email",
    label: "Email",
    required: true,
    type: "email",
  },
  {
    id: 2,
    name: "password",
    placeholder: "Unesite lozinku",
    label: "Lozinka",
    required: true,
    type: "password",
  },
];

export const CheckoutData = ({
  payment_options,
  delivery_options,
  summary,
  items,
  refreshCart,
  refreshSummary,
  dataTmp,
  setDataTmp,
  errorsTmp,
  setErrorsTmp,
  totals,
  token,
}) => {
  const router = useRouter();
  const { data: cartCount } = useCartBadge();
  const [selected, setSelected] = useState({
    id: null,
    use_same_data: true,
  });
  const {
    data: dataLogin,
    setErrors,
    errors,
    setData,
  } = useForm({
    email: "",
    password: "",
  });
  const { mutate: login, isPending: isPendingLogin } = useLogin();

  const { loggedIn: userLoggedIn } = useContext(userContext);

  const { data: loggedIn } = useIsLoggedIn();

  const { data: billing_addresses } = userLoggedIn ? useBillingAddresses() : [];

  const { data: user_billing_addresses } = userLoggedIn
    ? useGetAccountData({ api: `/customers/billing-address`, method: "list" })
    : [];

  const { data: form, isLoading } = useGetAddress(
    billing_addresses?.length > 1 && selected?.id
      ? selected?.id
      : billing_addresses?.[0]?.id,
    "billing",
    loggedIn && Boolean(billing_addresses?.length),
  );

  const [postErrors, setPostErrors] = useState({
    fields: [],
  });

  const [isClosed, setIsClosed] = useState(false);

  const {
    data: checkOutData,
    mutate: checkOutMutate,
    isPending,
    isSuccess: isCheckoutSuccess,
  } = useCheckout({
    formData: dataTmp,
    setPostErrors: setPostErrors,
  });

  useEffect(() => {
    const defaultAddress = user_billing_addresses?.items?.find(
      (address) => address.set_default === 1,
    );
    if (defaultAddress) {
      const { id: billing_id } = defaultAddress;
      setSelected((prev) => ({
        ...prev,
        id: billing_id,
      }));
    }
  }, [user_billing_addresses?.items]);

  useEffect(() => {
    if (items && !isClosed) {
      const productOutOfStock = filterOutProductsOutOfStock(items);

      setPostErrors((prevErrors) => ({
        ...prevErrors,
        fields: productOutOfStock,
      }));
    }
  }, [items]);

  useEffect(() => {
    if (isCheckoutSuccess && checkOutData) {
      switch (true) {
        case Boolean(checkOutData?.payment_provider_data?.form) === false:
          return router.push(`/korpa/kupovina/${checkOutData?.order?.order_token}`);
        case Boolean(checkOutData?.payment_provider_data?.form) === true:
          return handleCreditCard(checkOutData);
        default:
          break;
      }
    }
  }, [isCheckoutSuccess, checkOutData, router]);
  

  useEffect(
    () => {
      if (!isLoading) {
        handleSetData("default_data", form, dataTmp, setDataTmp);
      }
    },
    [selected?.id, form?.[0]],
    isLoading,
  );

  useEffect(() => {
    if (selected?.use_same_data) {
      return handleSetData("same_data", form, dataTmp, setDataTmp);
    } else {
      return handleSetData("different_data", form, dataTmp, setDataTmp);
    }
  }, [selected?.id, selected?.use_same_data]);

  return (
    <div
      className={`grid grid-cols-6 gap-10 bg-lightGray 2xl:grid-cols-6 2xl:gap-16 2xl:gap-[140px]`}
    >
      <div className={`col-span-6 flex flex-col lg:col-span-3`}>
        {!userLoggedIn && (
          <div>
            <div className={`flex flex-col gap-2`}>
              <h2 className="text-3xl font-light 2xl:text-4xl">
                Ukoliko ste registrovani, možete se prijaviti
              </h2>
              <div className="h-[2px] w-[200px] bg-primary" />
            </div>
            <Form
              data={dataLogin}
              errors={errors}
              fields={fields}
              isPending={isPendingLogin}
              handleSubmit={(e) => {
                handleSubmit(e, dataLogin, setData, login, fields, setErrors);
              }}
              setData={setData}
              handleInputChange={(e) => {
                handleInputChange(e, setData, setErrors);
              }}
              showOptions={false}
              button_text={`Prijavite se`}
              buttonClassName={"sm:!w-[200px] !py-2 mt-2"}
            />
            <div className="my-10 text-2xl font-semibold 2xl:my-20">
              Ili nastavite kao gost
            </div>
          </div>
        )}
        <CheckoutUserInfo
          errors={errorsTmp}
          selected={selected}
          setErrors={setErrorsTmp}
          setFormData={setDataTmp}
          formData={dataTmp}
        />
        <CheckoutOptions
          errors={errorsTmp}
          setErrors={setErrorsTmp}
          delivery_options={delivery_options}
          payment_options={payment_options}
          setFormData={setDataTmp}
          formData={dataTmp}
        />
      </div>

      <div
        className={`col-span-6 flex flex-col gap-3 md:col-span-4 lg:col-span-3 2xl:col-span-3`}
      >
        <div className={`mb-2 flex flex-col gap-2`}>
          <h2 className="text-3xl font-light 2xl:text-4xl">
            Proizvodi u korpi ({cartCount})
          </h2>
          <div className="h-[2px] w-[200px] bg-primary" />
        </div>
        <div
          className={`customScroll mb-12 mt-5 flex max-h-[500px] flex-col gap-5 overflow-y-auto pr-2 sm:mb-10 2xl:mb-20`}
        >
          {(items ?? [])?.map(({ product, cart }, index) => (
            <CheckoutItems
              product={product}
              cart={cart}
              key={index}
              refreshCart={refreshCart}
              isClosed={isClosed}
              refreshSummary={refreshSummary}
            />
          ))}
        </div>
        <CheckoutTotals summary={summary} totals={totals} />
        <GeneralTermsOfUseField
          dataTmp={dataTmp}
          setDataTmp={setDataTmp}
          errorsTmp={errorsTmp}
          setErrorsTmp={setErrorsTmp}
        />
        <CheckoutButton
          isPending={isPending}
          dataTmp={dataTmp}
          setErrorsTmp={setErrorsTmp}
          checkOutMutate={checkOutMutate}
          selected={selected}
          setDataTmp={setDataTmp}
          token={token}
        />
      </div>
      <NoStockModal
        postErrors={postErrors}
        setPostErrors={setPostErrors}
        setIsClosed={setIsClosed}
        refreshSummary={refreshSummary}
        refreshCart={refreshCart}
      />
      {isCheckoutSuccess && checkOutData?.credit_card === null && (
        <div
          className={`fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500`}
        >
          <Spinner className={`!scale-125`} />
        </div>
      )}
    </div>
  );
};
