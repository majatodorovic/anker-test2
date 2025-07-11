import { useState } from "react";
import { get } from "@/api/api";
import { Table as SharedTable } from "@/_pages/account/account-data/shared";
import { ModalFrame } from "@/_components/shared/modal";
import { useRouter } from "next/navigation";
import { getActiveTab } from "@/_pages/account/sidebar";
import { formatDate } from "@/helpers/convertDate";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Image from "next/image";
import { ApiPagination } from "@/_components/pagination";

const PurchaseOrders = ({ digitalProduct }) => {
  const active_tab = getActiveTab();
  const router = useRouter();
  const [displayModal, setDisplayModal] = useState({
    display: false,
  });

  return (
    <div>
      {digitalProduct && (
        <>
          <SharedTable
            data={digitalProduct.items}
            fields={[
              {
                id: "nameID",
                name: "name",
                placeholder: "Ime",
                type: "text",
              },
              {
                id: "descriptionID",
                name: "short_description",
                placeholder: "Kratak opis",
                type: "text",
                required: false,
              },
              {
                id: 12,
                name: "actions",
                type: "actions",
                actions: "eyeopen",
              },
              {
                id: 13,
                name: "actions",
                type: "actions",
                actions: "document",
              },
            ]}
            onClick={async (action, row) => {
              switch (action) {
                case "eyeopen":
                  {
                    const detailsData = await get(
                      `/customers/digital-material/order-item/main/${row.order_item_id}`,
                    ).then((res) => {
                      return res?.payload;
                    });

                    if (detailsData) {
                      const {
                        order_item: {
                          basic_data: { name, short_description, image },
                        },
                        order: {
                          delivery_method_name,
                          slug,
                          status,
                          total,
                          payment_method_name,
                          created_at,
                        },
                      } = detailsData;

                      setDisplayModal({
                        name,
                        short_description,
                        image,
                        delivery_method_name,
                        slug,
                        status,
                        total,
                        payment_method_name,
                        created_at,
                        display: true,
                      });
                    }
                  }
                  break;
                case "document":
                  {
                    router.push(
                      `?tab=${active_tab}&&documentID=${row.order_item_id}`,
                    );
                  }
                  break;
                default:
                  break;
              }
            }}
          />
          <ApiPagination pagination={digitalProduct?.pagination} />
          <ModalFrame
            handleClose={() =>
              setDisplayModal({
                display: false,
              })
            }
            display={displayModal?.display}
          >
            {displayModal.display && (
              <div>
                <h3 className={`text-xl`}>{displayModal?.name}</h3>
                <p className={`mb-4 mt-2 text-sm text-gray-500`}>
                  {displayModal?.short_description}
                </p>
                <p className="mb-2 text-gray-700">
                  Porudžbenica: {displayModal?.slug}
                </p>
                <p className="mb-2 text-gray-700">
                  Kreirana: {formatDate(displayModal?.created_at)}
                </p>
                <p className="mb-2 text-gray-700">
                  Način dostave: {displayModal?.delivery_method_name}
                </p>
                <p className="mb-4 text-gray-700">
                  Način plaćanja: {displayModal?.payment_method_name}
                </p>
                <p className="mb-4 text-gray-700">
                  Totalna cena: {displayModal?.total}
                </p>
                <p className="mb-4 text-gray-700">
                  Status: {displayModal?.status}
                </p>
                <div className="flex justify-center">
                  <div className="relative h-[200px] w-[200px]">
                    <Image
                      src={convertHttpToHttps(displayModal?.image ?? "")}
                      alt={displayModal?.name}
                      className="object-contain"
                      fill
                    />
                  </div>
                </div>
              </div>
            )}
          </ModalFrame>
        </>
      )}
    </div>
  );
};

export default PurchaseOrders;
