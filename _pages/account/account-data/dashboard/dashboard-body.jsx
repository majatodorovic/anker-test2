import buttons from "./buttons.json";
import { useTabChange } from "@/_pages/account/sidebar";

export const DashboardBody = () => {
  const handleTabChange = useTabChange();
  let btns = buttons;
  let show_shipping_options = process.env.SHOW_CHECKOUT_SHIPPING_FORM;

  if (show_shipping_options === "false") {
    btns = buttons?.filter((button) => button.tab !== "shipping");
  }
  return (
    <div className={`mt-5`}>
      <h2 className={`text-lg`}>Predložene akcije</h2>
      <div className={`mt-3 flex flex-wrap items-center gap-3`}>
        {(btns ?? [])?.map(({ id, tab, title }) => {
          return (
            <button
              onClick={() => handleTabChange(tab)}
              key={id}
              className={`w-fit border border-transparent bg-gray-100 p-2 text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-200`}
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
};
