"use client";
import { SectionHeader } from "@/_pages/account/account-data/shared/section-header";
import { useGetAccountData } from "@/hooks/ecommerce.hooks";
import { Table } from "@/_pages/account/account-data/shared";
import { Modal } from "@/_components/shared/modal";
import { useState } from "react";
import { currencyFormat } from "@/helpers/functions";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import tableFields from "./tableFields.json";
import { SectionBody } from "@/_pages/account/account-data/shared/section-body";
import { formatDate } from "@/helpers/convertDate";
import { ApiPagination } from "@/_components/pagination";
import { useSearchParams } from "next/navigation";

export const PreviousOrders = () => {
  const params = useSearchParams();
  const page = params?.get("strana");

  const { data: previous_orders } = useGetAccountData({
    api: `/customers/previous-orders`,
    method: "list",
    body: { page },
  });

  const [show, setShow] = useState({
    show: false,
    order_token: null,
  });

  return (
    <>
      <SectionHeader
        title={"Prethodne kupovine"}
        description={"Ovde možete videti sve vaše prethodne kupovine."}
      />
      <SectionBody>
        <Table
          data={previous_orders?.items}
          fields={tableFields}
          onClick={(_, row) => {
            setShow({
              show: true,
              order_token: row?.order_token,
            });
          }}
        />
        {previous_orders && previous_orders?.pagination && (
          <ApiPagination pagination={previous_orders.pagination} />
        )}
      </SectionBody>
      <Modal
        type={`modal`}
        show={show?.show}
        handleOpen={() =>
          setShow({
            show: false,
            order_token: null,
          })
        }
        description={`Ovo su detalji vaše porudžbenice.`}
        title={`Detalji porudžbenice`}
      >
        <ModalChildren order_token={show.order_token} />
      </Modal>
    </>
  );
};

const ModalChildren = ({ order_token }) => {
  const { data } = useGetAccountData({
    api: `/customers/previous-orders/${order_token}`,
    method: "get",
  });

  if (data) {
    const { order, items } = data;
    return (
      <div className="mx-auto mt-5 max-w-lg rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-medium">
          Porudžbenica: {order?.slug}
        </h1>
        <p className="mb-2 text-gray-700">
          Kreirana: {formatDate(order?.created_at)}
        </p>
        <p className="mb-2 text-gray-700">
          Način dostave: {order?.delivery_method_name}
        </p>
        <p className="mb-4 text-gray-700">
          Način plaćanja: {order?.payment_method_name}
        </p>

        <ul className="space-y-4">
          {(items ?? [])?.map(
            ({
              basic_data: { id, name, quantity, image },
              price: { total, currency },
            }) => {
              return (
                <li
                  key={id}
                  className="bg-lightGray flex items-center space-x-4 rounded-lg border border-gray-200 p-4 shadow-sm"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={convertHttpToHttps(image ?? "")}
                      alt={name ?? "product"}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Naziv: {name}</p>
                    <p className="text-gray-600">
                      Cena: {currencyFormat(total, currency)}
                    </p>
                    <p className="text-gray-600">Količina: {quantity}</p>
                  </div>
                </li>
              );
            },
          )}
        </ul>
      </div>
    );
  }
};
