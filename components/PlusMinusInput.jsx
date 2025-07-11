"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const roundCustom = (num) => {
  const decimalPart = num % 1;

  if (decimalPart < 0.01) {
    return Math.round(num);
  } else {
    return parseFloat(Number(num).toFixed(2));
  }
};

const PlusMinusInput = ({
  label,
  displayComponent,
  behaviours,
  quantityError,
  quantity,
  setQuantity,
  maxAmount,
  isDetails,
}) => {
  // Hookovi uvek pozvani na početku komponente:
  const allow_decimals = behaviours?.display.allow_decimals;
  const default_loop_quantity = behaviours?.default_loop_quantity;

  const intQuantity = allow_decimals ? quantity : Math.floor(quantity);
  const [tempValue, setTempValue] = useState(intQuantity);
  const [timeoutValue, setTimeoutValue] = useState(0);
  const [config, setConfig] = useState();

  useEffect(() => {
    if (quantity === 0) return;

    if (quantity !== tempValue) {
      setTempValue(quantity);
    }

    if (quantity > maxAmount) {
      setTempValue(Number(maxAmount));
    }
  }, [quantity, maxAmount]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const inventory_config = localStorage.getItem("configuration_inventories");
      if (inventory_config) {
        let temp = JSON.parse(inventory_config);
        temp = temp?.filter(
          (item) => item?.slug === "check_requested_inventory_product_quantity"
        );
        if (temp?.length > 0) {
          setConfig(Boolean(Number(temp[0]?.value)));
        }
      }
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (tempValue === quantity) {
        return;
      }

      if (
        tempValue === 0 ||
        tempValue === "" ||
        tempValue < default_loop_quantity
      ) {
        setQuantity(default_loop_quantity);
        setTempValue(default_loop_quantity);
        return;
      }

      let clickedOnIncrease = roundCustom(tempValue) / default_loop_quantity;
      const decimalPart = clickedOnIncrease % 1;
      if (decimalPart < 0.01) {
        clickedOnIncrease = Math.round(clickedOnIncrease);
      }
      clickedOnIncrease = Math.ceil(clickedOnIncrease);

      let newValue = clickedOnIncrease * default_loop_quantity;
      if (!Number.isInteger(newValue)) {
        newValue = parseFloat(newValue).toFixed(2);
      }

      setQuantity(newValue);
      setTempValue(newValue);
    }, timeoutValue);

    return () => clearTimeout(handler);
  }, [tempValue, quantity, default_loop_quantity, setQuantity, timeoutValue]);

  // Sada vršimo proveru displayComponent NAKON hook-ova:
  if (!displayComponent) return null;

  const showError = () => {
    toast.warn(`${quantityError()}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    return;
  };

  const handleChange = (e) => {
    if (quantityError()) return showError();

    let newValue = e.target.value;
    const regex = allow_decimals ? /^\d*\.?\d*$/ : /^\d*$/;

    if (newValue > Number(maxAmount)) {
      toast.error(`Na lageru trenutno nema željena količina artikala.`, {
        position: "top-center",
      });
    } else if (regex.test(newValue)) {
      setTempValue(newValue);
      setTimeoutValue(1000);
    }
  };

  const countQuantity = ({ defaultLoopQuantity, currentQuantity, isIncreased }) => {
    if (quantityError()) return showError();

    setTimeoutValue(0);

    let clickedOnIncrease = currentQuantity / defaultLoopQuantity;
    if (clickedOnIncrease < 1) return;

    if (isIncreased) {
      clickedOnIncrease = clickedOnIncrease + 1;
    } else if (clickedOnIncrease > 1) {
      clickedOnIncrease = clickedOnIncrease - 1;
    }

    if (quantity > maxAmount && config) {
      toast.error("Nema dovoljno proizvoda na stanju!");
      return;
    }
    let newValue = clickedOnIncrease * defaultLoopQuantity;
    if (!Number.isInteger(newValue)) {
      newValue = parseFloat(newValue).toFixed(2);
    }

    if (newValue > Number(maxAmount)) {
      toast.error(`Na lageru trenutno nema željena količina artikala.`, {
        position: "top-center",
      });
      setTempValue(Number(maxAmount));
      setQuantity(Number(maxAmount));
    } else setTempValue(newValue);
  };

  return (
    <div
      className={`flex items-center ${
        isDetails ? "flex-col !items-start gap-2" : ""
      }`}
    >
      {label && (
        <span
          className={`text-lg font-light ${
            isDetails ? "!text-base font-normal" : ""
          }`}
        >
          Količina:&nbsp;
        </span>
      )}
      <div
        className={`flex items-stretch bg-white ${
          isDetails ? "w-28 border border-gray-400 py-1" : "w-[60px] p-0"
        }`}
      >
        <button
          className={`flex shrink-0 cursor-pointer items-center justify-center text-[0.9rem] ${
            isDetails ? "w-8 !text-gray-400" : "w-4"
          }`}
          onClick={() =>
            countQuantity({
              defaultLoopQuantity: default_loop_quantity,
              currentQuantity: quantity,
              isIncreased: false,
            })
          }
        >
          <span>-</span>
        </button>
        <input
          type={`text`}
          className={`w-full border-0 bg-inherit px-1 text-center text-[0.9rem] font-normal focus:outline-none focus:ring-0 ${
            isDetails ? "py-1 !text-gray-400" : "p-0"
          }`}
          value={tempValue === 0 ? 1 : tempValue}
          onChange={handleChange}
        />
        <button
          className={`flex shrink-0 cursor-pointer items-center justify-center text-[0.9rem] ${
            isDetails ? "w-8 !text-gray-400" : "w-4"
          }`}
          onClick={() =>
            countQuantity({
              defaultLoopQuantity: default_loop_quantity,
              currentQuantity: quantity,
              isIncreased: true,
            })
          }
        >
          <span>+</span>
        </button>
      </div>
    </div>
  );
};

export default PlusMinusInput;
