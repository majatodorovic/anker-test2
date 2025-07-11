import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRemoveFromCart } from "@/hooks/ecommerce.hooks";

const NoStockModal = ({
  postErrors,
  setPostErrors,
  setIsClosed,
  refreshCart,
  refreshSummary,
}) => {
  const { mutate: removeFromCart, isSuccess } = useRemoveFromCart();
  useEffect(() => {
    if (isSuccess) {
      refreshCart();
      refreshSummary();
    }
  }, [isSuccess, refreshCart, refreshSummary]);

  return (
    <div
      className={
        postErrors?.fields?.length > 0
          ? `visible fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500`
          : `invisible fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-md transition-all duration-500`
      }
    >
      <div
        className={`relative inset-0 m-auto h-fit w-fit bg-white p-[1rem] max-sm:mx-2`}
      >
        <div className={`mt-[3rem] px-[0.25rem] md:px-9`}>
          <h3 className={`mt-4 text-center text-xl font-semibold`}>
            U korpi su proizvodi koji trenutno nisu na stanju.
          </h3>
          <p className={`mt-2 text-center text-base font-normal`}>
            Kako bi završili porudžbinu, morate izbrisati sledeće artikle iz
            korpe:
          </p>
          <div className={`divide-y-black mt-[0.85rem] flex flex-col divide-y`}>
            {(postErrors?.fields ?? [])?.map(
              ({
                cart: { id, cart_item_id },
                product: { id: id_product, name, sku, slug, image },
                errors,
              }) => {
                let deleted_items_count = 0;
                //ako je deleted_items_count jednak broju proizvoda koji nisu na lageru, gasimo modal
                if (deleted_items_count === postErrors?.fields?.length) {
                  setPostErrors(null);
                }

                return (
                  <div key={id} className={`flex items-start gap-2 py-5`}>
                    <Link href={`/${slug}`}>
                      <Image
                        src={image?.[0] ?? "/images/placeholder.jpg"}
                        alt={name ?? sku ?? slug ?? "Ecommerce"}
                        width={80}
                        height={80}
                        className={`aspect-square min-w-[80px]`}
                      />
                    </Link>
                    <div className={`flex flex-col`}>
                      <Link href={`/${slug}`} className={`text-sm font-normal`}>
                        {name}
                      </Link>
                      <ul className={`flex flex-col gap-1`}>
                        {(errors ?? ["Trenutno nije na stanju."])?.map(
                          (error) => (
                            <li
                              key={error}
                              className={`text-[13px] font-bold text-[#e10000]`}
                            >
                              {error}
                            </li>
                          ),
                        )}
                      </ul>
                      <button
                        onClick={async () => {
                          await removeFromCart({ id: cart_item_id });
                          //nakon brisanja, iz postErrors.fields filtriramo taj item i izbacujemo ga
                          let arr = [];
                          arr = (postErrors?.fields ?? [])?.filter(
                            (item) => item.product.id !== id_product,
                          );
                          setPostErrors({
                            ...postErrors,
                            fields: arr,
                          });
                        }}
                        className={`mt-1 flex w-[10rem] items-center justify-between bg-[#000] px-2 py-[0.225rem] font-normal text-white transition-all duration-300 hover:bg-[#e10000] hover:bg-opacity-80`}
                      >
                        Ukloni iz korpe{" "}
                        <i className="fa-solid fa-trash ml-auto"></i>
                      </button>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
        <div className={`mt-2 flex items-center justify-end`}>
          <button
            className={`mainButton`}
            onClick={() => {
              setPostErrors(null);
              setIsClosed(true);
            }}
          >
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoStockModal;
