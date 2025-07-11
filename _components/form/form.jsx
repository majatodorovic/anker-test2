"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "@/api/api";

export const Form = ({ fields = [], onChange = () => {}, errors = [] }) => {
  return (fields ?? [])?.map(
    ({ field_name, prop_name, input_type, options, required, fillFromApi }) => {
      switch (input_type) {
        case "select":
          return (
            <Select
              required={required}
              key={field_name}
              name={prop_name}
              field_name={field_name}
              options={options}
              fillFromApi={fillFromApi}
              onChange={onChange}
              errors={errors}
            />
          );
        default:
          return null;
      }
    },
  );
};

export const Select = ({
  name = "",
  required,
  fillFromApi = "",
  field_name = "",
  onChange = () => {},
  errors = [],
}) => {
  const { data: ddl_options } = useQuery({
    queryKey: [
      {
        field_name: field_name,
        fillFromApi: fillFromApi,
      },
    ],
    queryFn: async () => {
      return await fetch(`${fillFromApi}`, {
        order_data: {},
        selected_data: {},
        field_options: {
          find_type: "markets_from_countries",
          id_countries: 193,
        },
      }).then((res) => res?.payload);
    },
  });

  const [selected, setSelected] = useState({
    id: null,
    name: null,
  });

  if (ddl_options) {
    const { values } = ddl_options;

    return (
      <div className={`mt-2 flex flex-col gap-1`}>
        <label htmlFor={name} className={``}>
          {field_name}
        </label>
        <select
          required={required}
          id={name}
          value={selected?.id || ""}
          className={`cursor-pointer text-black focus:text-black focus:outline-none focus:ring-0 ${
            errors?.includes("delivery_method_options")
              ? `border border-red-500`
              : ``
          }`}
          name={name}
          onChange={(e) => {
            if (e?.target?.value !== `none`) {
              setSelected({
                id: e?.target?.value,
                name: e.target?.options?.[e?.target?.selectedIndex]?.text,
              });
              onChange({
                value: e?.target?.value,
                prop_name: name,
                selected: {
                  id: e?.target?.value,
                  name: e?.target?.options?.[e?.target?.selectedIndex]?.text,
                },
              });
            }
          }}
        >
          <option value={`none`}>Izaberite radnju</option>
          {(values ?? [])?.map(({ id, name }) => {
            return (
              <option key={id ?? ""} value={id ?? ""} name={name}>
                {name ?? ""}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
  return null;
};
