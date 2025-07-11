"use client";

import Link from "next/link";
import Image from "next/image";
import { currencyFormat } from "@/helpers/functions";

export const OrderItemsInfo = ({ order }) => {
  return (
    <div
      className={`col-span-2 grid h-fit grid-cols-2 gap-x-[1.5rem] gap-y-[1.5rem] max-md:mt-5 md:col-span-1 md:py-10`}
    >
      <div
        className={`relative col-span-2 flex h-[245px] flex-col rounded-lg bg-[#f0f0f080] p-[2rem] xl:col-span-1`}
      >
        <h1 className={`text- border-b-2 border-b-gray-300 font-semibold`}>
          Pregled porudžbenice
        </h1>
        <p className={`mt-2 text-sm`}>
          Broj porudžbenice:{" "}
          <span className={`font-semibold`}>{order?.order?.slug}</span>
        </p>
        <p className={`mt-2 text-sm`}>
          Status porudžbenice:{" "}
          <span className={`font-semibold text-yellow-500`}>Na čekanju</span>
        </p>
      </div>
      <div
        className={`relative col-span-2 flex h-[245px] flex-col rounded-lg bg-[#f0f0f080] p-[2rem] xl:col-span-1`}
      >
        <h1 className={`text- border-b-2 border-b-gray-300 font-semibold`}>
          Podaci o kupcu
        </h1>
        <p className={`mt-2 text-sm`}>
          Ime i prezime: &nbsp;
          <span className={`font-semibold`}>
            {order?.billing_address?.first_name}{" "}
            {order?.billing_address?.last_name}
          </span>
        </p>
        <p className={`mt-2 text-sm`}>
          E-mail:
          <span className={`font-semibold`}>
            {" "}
            {order?.billing_address?.email}
          </span>
        </p>

        <p className={`mt-2 text-sm`}>
          Adresa dostave:
          <span className={`font-semibold`}>
            {" "}
            {order?.shipping_address?.address}{" "}
            {order?.shipping_address?.object_number} ,{" "}
            {order?.shipping_address?.zip_code}
            &nbsp;{order?.shipping_address?.town_name}
          </span>
        </p>
        <p className={`mt-2 text-sm`}>
          Telefon:
          <span className={`font-semibold`}>
            &nbsp;{order?.shipping_address?.phone}
          </span>
        </p>
      </div>
      <div
        className={`scrollCustom relative col-span-2 flex h-[245px] flex-col overflow-y-auto rounded-lg bg-[#f0f0f080] p-[2rem] xl:col-span-1`}
      >
        <h1 className={`text- border-b-2 border-b-gray-300 font-semibold`}>
          Poručeni artikli
        </h1>
        {order?.items?.map((item, itemIndex) => {
          return (
            <Link href={`/${item?.basic_data?.slug}`} key={itemIndex}>
              <div className={`mt-3 flex items-center gap-10`}>
                <div>
                  {item?.basic_data?.image && (
                    <Image
                      src={item?.basic_data?.image}
                      alt={``}
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <div className={`flex flex-col gap-y-1`}>
                  <h1 className={`text-sm font-semibold`}>
                    {item?.basic_data?.name}
                  </h1>
                  <p className={`text-xs`}>{item?.basic_data?.sku}</p>
                  <p
                    className={`mt-2 w-fit text-center text-xs font-bold`}
                  >
                    {currencyFormat(item?.price?.total, item?.price?.currency)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div
        className={`relative col-span-2 flex h-[245px] flex-col rounded-lg bg-[#f0f0f080] p-[2rem] pb-7 max-md:mb-5 xl:col-span-1`}
      >
        <h1 className={`text- border-b-2 border-b-gray-300 font-semibold`}>
          Podaci o prodavcu
        </h1>
        <p className={`mt-2 text-sm`}>
          Naziv:
          <span className={`font-semibold`}> {process.env.NAME}</span>
        </p>
        <p className={`mt-2 text-sm`}>
          PIB:
          <span className={`font-semibold`}>{process.env.PIB}</span>
        </p>
        <p className={`mt-2 text-sm`}>
          Adresa:
          <span className={`font-semibold`}>{process.env.ADDRESS}</span>
        </p>
      </div>
    </div>
  );
};
