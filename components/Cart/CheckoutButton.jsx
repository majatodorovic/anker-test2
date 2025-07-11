"use client";
import { useState, useEffect } from "react";
const CheckoutButton = ({
  isPending,
  dataTmp,
  setErrorsTmp,
  checkOutMutate,
  selected,
  setDataTmp,
  token,
}) => {
  const [required, setRequired] = useState([
    "payment_method",
    "delivery_method",
    "first_name_shipping",
    "last_name_shipping",
    "phone_shipping",
    "email_shipping",
    "address_shipping",
    "town_name_shipping",
    "zip_code_shipping",
    "object_number_shipping",
    "accept_rules",
    "first_name_billing",
    "last_name_billing",
    "phone_billing",
    "email_billing",
    "address_billing",
    "town_name_billing",
    "zip_code_billing",
    "object_number_billing",
  ]);

  useEffect(() => {
    if (dataTmp?.delivery_method === "in_store_pickup") {
      setRequired((prevRequired) => [
        ...prevRequired,
        "delivery_method_options",
      ]);
    } else {
      setRequired((prevRequired) =>
        prevRequired.filter((item) => item !== "delivery_method_options"),
      );
    }
  }, [dataTmp?.delivery_method]);

  useEffect(() => {
    setRequired((prevRequired) =>
      selected?.use_same_data
        ? prevRequired.filter(
            (item) =>
              item !== "floor_shipping" && item !== "apartment_number_shipping",
          )
        : [...prevRequired, "floor_shipping", "apartment_number_shipping"],
    );
  }, [selected?.use_same_data]);
  return (
    <button
      disabled={isPending}
      className="mainButton mt-2 !py-4 !text-xl !font-bold 2xl:w-2/3"
      onClick={() => {
        let err = [];
        (required ?? [])?.forEach((key) => {
          //Error handling for countries
          if (
            dataTmp.id_country_shipping == "-" ||
            dataTmp.id_country_shipping == 0
          ) {
            err = [...err, "id_country_shipping"];
          } else if (dataTmp.id_town_shipping === "") {
            err = [...err, "id_town_shipping"];
          } else {
            if (!dataTmp[key] || dataTmp[key]?.length === 0) {
              err.push(key);
            }
          }
        });
        setErrorsTmp(err);
        if (err?.length === 0) {
          setDataTmp({
            ...dataTmp,
            gcaptcha: token,
          });
          const timeout = setTimeout(() => {
            checkOutMutate();
          }, 150);

          return () => clearTimeout(timeout);
        } else {
          window.scrollTo(0, 0);
        }
      }}
    >
      {isPending ? "Obrada..." : "Završite kupovinu"}
    </button>
  );
};

export default CheckoutButton;
