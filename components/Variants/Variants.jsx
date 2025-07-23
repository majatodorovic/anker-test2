"use client";
import { useState, useEffect } from "react";

export default function Variants({
  setTempError,
  product,
  productSlug,
  setProductVariant,
  setSelectedOptions,
  displayComponent,
  setQuantity,
}) {
  // Hookovi MORAJU biti pozvani uvek, zato nema ranog return-a pre hookova
  let variant_options = product?.data?.variant_options;
  let variant_items = product?.data?.variant_items;
  const [selected, setSelected] = useState([]); // niz selektovanih varianti

  /*
   * Iz selektovanih varianti stvara key. Proverava postoji li takav key u listi variant proizvoda
   * Ako postoji, izbacuje tu variantu tj taj proizvod
   */
  const getCurrentProductFromPathname = (selectedItems) => {
    const currentItem = variant_items.find((item) => {
      const variant_key_array = item?.variant_key_array;

      if (variant_key_array?.length !== selectedItems?.length) {
        return false;
      }
      // Provera da li su svi elementi iz selectedItems prisutni u variant_key_array
      const allItemsMatch = selectedItems.every((selectedItem) =>
        variant_key_array.some(
          (variant) =>
            variant.attribute_key === selectedItem.attribute_key &&
            variant.value_key === selectedItem.value_key,
        ),
      );

      return allItemsMatch;
    });

    return currentItem;
  };

  // Učitavanje inicijalnih vrednosti
  useEffect(() => {
    if (product?.data?.item?.slug === productSlug) return;

    let selected_item = variant_items.find((item) =>
      item.slug_path.includes(productSlug),
    );

    if (selected.length === 0) {
      if (selected_item && product?.data?.item?.slug !== productSlug) {
        setSelected(selected_item.variant_key_array);
      }

      if (product?.data?.item?.slug !== productSlug)
        setSelectedOptions(selected_item.variant_key_array);

      const currentItem = getCurrentProductFromPathname(
        selected_item.variant_key_array,
      );

      setProductVariant(currentItem);
    }
  }, []);

  // onChangeHandler funkcija za selektovanje varijante nakon odabira vrednosti
  const onChangeHandler = (attribute_key, value_key) => {
    let temp_selected = [...selected];

    let temp_selected_item = {
      attribute_key: attribute_key,
      value_key: value_key,
    };

    let temp_index = temp_selected.findIndex(
      (x) => x.attribute_key === temp_selected_item.attribute_key,
    );

    if (temp_index > -1) {
      temp_selected[temp_index] = temp_selected_item;
    } else {
      temp_selected.push(temp_selected_item);
    }

    setSelected(temp_selected);
    if (setQuantity) setQuantity();

    const currentItem = getCurrentProductFromPathname(temp_selected);
    setProductVariant(currentItem ?? []);

    if (currentItem) {
      window?.history?.replaceState(null, null, `${currentItem.slug_path}`);
      setTempError(null);
    }
  };

  // Uslovni prikaz komponente - ako nije za prikaz, vrati null
  if (!displayComponent) return null;

  return (
    <div className="flex w-full gap-10 md:gap-4">
      {variant_options?.map((item, index) => (
        <div key={index} className="flex flex-1 flex-col items-start">
          <label htmlFor={item.id} className="text-base">
            {item.attribute.name}:
          </label>
          <select
            id={item.id}
            name={item.attribute.key}
            className="mainInput !border !border-gray-400 !font-light !text-gray-400"
            value={
              selected.find((s) => s.attribute_key === item.attribute.key)
                ?.value_key || ""
            }
            onChange={(e) =>
              onChangeHandler(item.attribute.key, e.target.value)
            }
          >
            {item.values.map((value) => (
              <option key={value.id} value={value.key}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
