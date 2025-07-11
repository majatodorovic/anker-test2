"use client";

import { useContext } from "react";
import {
  getActiveTab,
  handleButtonText,
  handleClick,
  useTabChange,
} from "@/_pages/account/sidebar/functions";
import { useLogout } from "@/hooks/ecommerce.hooks";
import { userContext } from "@/context/userContext";
import { icons } from "@/_lib/icons";

export const Button = ({
  tab,
  title,
  id,
  type,
  button_text,
  icon,
  onClick,
}) => {
  const active_tab = getActiveTab();
  const handleTabChange = useTabChange();

  const { logout } = useContext(userContext);
  const { mutateAsync, isPending } = useLogout();

  switch (type) {
    case "sidebar":
      return (
        <button
          disabled={isPending}
          key={id}
          className={`${
            active_tab === tab
              ? "border border-gray-300 bg-gray-200 text-black"
              : "border border-transparent bg-gray-100 text-gray-700 hover:border-gray-300 hover:bg-gray-200"
          } p-2 text-sm disabled:cursor-not-allowed`}
          onClick={() => {
            handleClick(tab, mutateAsync, logout, handleTabChange);
          }}
        >
          {handleButtonText(isPending, tab, title)}
        </button>
      );
    case "section-header":
      if (icon || button_text) {
        return (
          <button
            onClick={onClick}
            key={id}
            className={`flex items-center gap-2 border border-transparent bg-gray-100 p-2 text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-200`}
          >
            {icon && <span className={`w-[1.3rem]`}>{icons?.[icon]}</span>}{" "}
            {button_text}
          </button>
        );
      }
  }
};
