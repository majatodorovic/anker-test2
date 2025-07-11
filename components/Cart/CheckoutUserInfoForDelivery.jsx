"use client";
import { useContext, useEffect } from "react";
import { Form, handleInputChange } from "@/_components/shared/form";
import fields from "./shipping.json";
import { userContext } from "@/context/userContext";

const CheckoutUserInfoForDelivery = ({
  dataTmp,
  setDataTmp,
  errorsTmp,
  setErrorsTmp,
  isPending = false,
  selected,
}) => {
  const { loggedIn: userLoggedIn } = useContext(userContext);

  useEffect(() => {
    formatCountry(fields);
  }, [selected?.id, selected?.use_same_data]);

  //Function to switch api use of country depending on user logged in status
  const formatCountry = (fields) => {
    fields.map((field) => {
      if (field.name === "id_country_shipping") {
        return {
          ...field,
          fill: userLoggedIn
            ? `/customers/shipping-address/ddl/id_country`
            : `checkout/ddl/id_country`,
        };
      }
    });
  };

  //Function to switch field from input to select and changing api depending on user logged in status
  const formatCheckoutFields = (fields, data) => {
    if (data && Number(data?.id_country_shipping) === 193) {
      return fields
        ?.map((field) => {
          if (field?.name === "town_name_shipping") {
            return {
              ...field,
              name: "id_town_shipping",
              type: "select",
              fill: userLoggedIn
                ? "/customers/shipping-address/ddl/id_town?id_country=${data?.id_country}"
                : `checkout/ddl/id_town?id_country=${data?.id_country_shipping}`,
            };
          }
          return field;
        })
        .filter(Boolean);
    }
    return fields;
  };

  return (
    <Form
      className={`grid grid-cols-2 gap-x-5`}
      data={dataTmp}
      errors={errorsTmp}
      fields={formatCheckoutFields(fields, dataTmp)}
      isPending={isPending}
      handleSubmit={() => {}}
      showOptions={false}
      handleInputChange={(e) => {
        if (e?.target?.name === "id_country_shipping") {
          handleInputChange(e, setDataTmp, setErrorsTmp);
          setDataTmp((prev) => ({
            ...prev,
            country_name_shipping: e?.target?.selectedOptions[0]?.text,
          }));
          if (e.target.selectedOptions[0] !== 193) {
            setDataTmp((prev) => ({
              ...prev,
              town_name_shipping: "",
            }));
          }
        } else if (e?.target?.name === "id_town_shipping") {
          handleInputChange(e, setDataTmp, setErrorsTmp);
          setDataTmp((prev) => ({
            ...prev,
            town_name_shipping: e?.target?.selectedOptions[0]?.text,
          }));
        } else {
          handleInputChange(e, setDataTmp, setErrorsTmp);
        }
      }}
      buttonClassName={"!hidden"}
    />
  );
};

export default CheckoutUserInfoForDelivery;
