import { currencyFormat } from "@/helpers/functions";

/**
 * Returns
 * status
 * of
 * the
 * price
 * @param {object} price -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {string}
 *     -
 *     The
 *     status
 *     of
 *     the
 *     price.
 */
export const getPriceStatus = (price) => {
  let status = "default";

  if (price?.discount?.active && price?.rebate?.active) {
    status = "discount_rebates";
  }
  if (price?.discount?.active && !price?.rebate?.active) {
    status = "discount";
  }
  if (price?.rebate?.active && !price?.discount?.active) {
    status = "rebates";
  }

  return status;
};

/**
 * Returns
 * are
 * prices
 * equal
 * @param {object} price -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {boolean}
 *     -
 *     Are
 *     prices
 *     equal.
 */
export const getArePricesEqual = (price) => {
  return price?.min?.price?.original === price?.max?.price?.original;
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} inventory -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     inventory
 *     data.
 * @returns {boolean}
 *     -
 *     The
 *     status
 *     of
 *     the
 *     inventory
 *     -
 *     is
 *     in
 *     stock
 *     or
 *     not.
 */
export const checkIsInStock = (inventory) => {
  return inventory?.inventory_defined && Number(inventory?.amount) > 0;
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} price -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {object}
 *     -
 *     The
 *     status
 *     of
 *     the
 *     price
 *     -
 *     is
 *     it
 *     defined
 *     and
 *     is
 *     it
 *     the
 *     range
 *     of
 *     prices.
 */
export const checkPrices = (price) => {
  let data = {};

  data.price_defined = !!(price?.price_defined && price?.price?.original > 0);

  data.price_range =
    price?.min?.price?.original > 0 && price?.max?.price?.original > 0;

  return data;
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} data -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {JSX.Element}
 *     -
 *     Default
 *     prices,
 *     without
 *     rebates
 *     or
 *     discounts.
 */
export const renderDefaultPrices = (data = {}) => {
  let is_range = data?.is_price_range;
  let price = data?.price;
  if (is_range) {
    let are_range_prices_equal = getArePricesEqual(price);
    if (are_range_prices_equal) {
      return (
        <p
          className={`!font-semibold text-left ${
            data?.is_details ? "!text-xl lg:!text-[28px]" : "!text-[20px]"
          }`}
        >
          {currencyFormat(price?.min?.price?.original, price?.currency)}
        </p>
      );
    } else {
      return (
        <p
          className={`!font-semibold text-left ${
            data?.is_details ? "!text-xl lg:!text-[28px]" : "!text-[20px]"
          }`}
        >
          {currencyFormat(price?.min?.price?.original, price?.currency)} -{" "}
          {currencyFormat(price?.max?.price?.original, price?.currency)}
        </p>
      );
    }
  } else {
    return (
      <p
        className={`!font-semibold text-left ${
          data?.is_details ? "!text-xl lg:!text-[28px]" : "!text-[20px]"
        }`}
      >
        {currencyFormat(price?.price?.original, price?.currency)}
      </p>
    );
  }
};

/**
 * Returns
 * status
 * of
 * the
 * inventory
 * @param {object} data -
 *     The
 *     object
 *     that
 *     holds
 *     the
 *     price
 *     data.
 * @returns {JSX.Element}
 *     -
 *     Prices
 *     after
 *     discount.
 */
export const renderDiscountPrices = (data = {}) => {
  let is_range = data?.is_price_range;
  let price = data?.price;

  const discount_number = (price?.min?.length > 0 && price?.max?.length > 0)  ? Math.abs(
    price?.min?.price?.original - price?.min?.price?.discount,
  ) : Math.abs(price?.price?.original - price?.price?.discount);

  const discount_percent = Math.ceil(
    (discount_number /( (price?.min?.length > 0 && price?.max?.length > 0) ? price?.min?.price?.original : price?.price?.original)) * 100,
  );

  if (is_range) {
    let are_range_prices_equal = getArePricesEqual(price);

    if (are_range_prices_equal) {
      return (
        <div
          className={`flex  flex-row flex-wrap text-left items-center gap-3`}
        >
          <p className={`font-semibold text-[20px] ${data?.is_details ? "!font-bold !text-xl lg:!text-2xl " : ""}`}>
            {currencyFormat(price?.min?.price?.discount, price?.currency)}
          </p>
          {data?.is_details && ( <div className="w-[1px] bg-[#aeaeae] h-4 max-sm:hidden" />)}
        <div className="flex items-center gap-3">
        <div className={`line-through text-base group font-light relative text-[#404041] ${data?.is_details ? "!text-xl lg:!text-[23px]" : ""}`}>
            {currencyFormat(price?.min?.price?.original, price?.currency)}
          </div>
          {data?.is_details && (
            <div className="bg-[#3ea400] rounded-[10px] font-semibold px-2  text-white">
              -{discount_percent}%
            </div>
          )}
        </div>
        </div>
      );
    } else {
      return (
        <div
        className={`flex  flex-row flex-wrap text-left items-center gap-3`}
        >
          <p className={`font-semibold text-[20px] ${data?.is_details ? "!font-bold !text-xl lg:!text-[28px]" : ""}`}>
            {currencyFormat(price?.min?.price?.discount, price?.currency)} -{" "}
            {currencyFormat(price?.max?.price?.discount, price?.currency)}
          </p>
          {data?.is_details && ( <div className="w-[1px] bg-[#aeaeae] h-4 max-sm:hidden" />)}
          <div className="flex items-center gap-3">
            <div className={`line-through text-base group font-light relative ${data?.is_details ? "!text-xl lg:!text-[23px]" : ""}`}>
            {currencyFormat(price?.min?.price?.original, price?.currency)} -{" "}
            {currencyFormat(price?.max?.price?.original, price?.currency)}
          </div>
          {data?.is_details && (
            <div className="bg-[#3ea400] rounded-[10px] font-semibold px-2  text-white">
              -{discount_percent}%
            </div>
          )}
        </div>
        </div>
      );
    }
  } else {
    return (
      <div
      className={`flex  flex-row flex-wrap text-left items-center gap-3`}
      >
        <p className={`font-semibold text-[20px] ${data?.is_details ? "!font-bold !text-xl lg:!text-[28px]" : ""}`}>
          {currencyFormat(price?.price?.discount, price?.currency)}
        </p>
        {data?.is_details && ( <div className="w-[1px] bg-[#aeaeae] h-4 max-sm:hidden" />)}
        <div className="flex items-center gap-3">
          <div className={`line-through text-base group font-light relative text-[#404041]  ${data?.is_details ? " !text-xl lg:!text-[23px]" : ""}`}>
          {currencyFormat(price?.price?.original, price?.currency)}
        </div>
        {data?.is_details && (
            <div className="bg-[#3ea400] rounded-[10px] font-semibold px-2  text-white">
              -{discount_percent}%
            </div>
          )}
        </div>
      </div>
    );
  }
};
