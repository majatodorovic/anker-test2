export const filterOutProductsOutOfStock = (data) => {
  const productsOutOfStock = [];
  data?.forEach((item) => {
    if (!item?.product?.inventory?.inventory_defined) {
      productsOutOfStock.push({
        cart: {
          id: null,
          cart_item_id: item?.cart?.cart_item_id,
        },
        product: {
          name: item?.product?.basic_data?.name,
          sku: item?.product?.basic_data?.sku,
          slug: item?.product?.slug,
          image: item?.product?.image,
          id: item?.product?.id,
        },
      });
    }
  });
  return productsOutOfStock;
};
