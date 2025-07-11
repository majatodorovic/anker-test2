import { currencyFormat } from "@/helpers/functions";

const CheckoutTotals = ({ summary, totals }) => {
  return (
    <div>
      <div className={`flex flex-col gap-2`}>
        <h2 className="text-3xl font-light 2xl:text-4xl">
          Vrednost vaše korpe
        </h2>
        <div className="h-[2px] w-[200px] bg-primary" />
      </div>
      <div className={`mt-8 flex flex-col`}>
        {summary?.use_vat && (
          <>
            <div className={`flex items-center justify-between py-2`}>
              <p className={`text-lg`}>Ukupna vrednost korpe bez PDV-a:</p>
              <p className={`text-lg`}>
                {currencyFormat(totals?.with_out_vat)}
              </p>
            </div>
            <div
              className={`flex items-center justify-between border-t border-t-gray-200 py-2`}
            >
              <p className={`text-lg`}>PDV:</p>
              <p className={`text-lg`}>{currencyFormat(totals?.vat)}</p>
            </div>
          </>
        )}
        <div
          className={`flex items-center justify-between border-t border-t-gray-200 py-2`}
        >
          <p className={`text-lg`}>Iznos porudžbine:</p>
          <p className={`text-lg`}>
            {currencyFormat(summary?.totals?.with_vat)}
          </p>
        </div>
        <div
          className={`flex items-center justify-between border-t border-t-gray-200 py-2`}
        >
          <p className={`text-lg`}>Popust:</p>
          <p className={`text-lg`}>
            {summary?.totals?.items_discount_amount +
              summary?.totals?.cart_discount_amount >
              0 && <span>-</span>}
            {currencyFormat(
              summary?.totals?.items_discount_amount +
                summary?.totals?.cart_discount_amount,
            )}
          </p>
        </div>
        <div
          className={`flex items-center justify-between border-t border-t-gray-200 py-2`}
        >
          <p className={`text-lg`}>Dostava:</p>
          <p className={`text-lg`}>
            {/* Checkout if the delivery is free */}
            {summary?.totals?.cart_discount >
            summary?.options?.delivery?.free_delivery?.amount ? (
              <span className="font-medium uppercase text-[#3ea400]">
                Besplatna{" "}
              </span>
            ) : (
              <span>{currencyFormat(summary?.totals?.delivery_amount)}</span>
            )}
          </p>
        </div>
        <div
          className={`flex items-center justify-between border-t border-t-gray-200 py-2`}
        >
          <p className={`text-lg font-semibold`}>Ukupno za naplatu:</p>
          <p className={`text-lg font-semibold`}>
            {currencyFormat(summary?.totals?.total)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTotals;
