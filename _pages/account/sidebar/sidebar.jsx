"use client";

import { Button } from "@/_pages/account/account-data/shared";
import buttons from "./buttons.json";
import { SidebarBasic } from "@/_pages/account/sidebar/sidebar-basic";
import { Suspense } from "react";

export const Sidebar = () => {
  let btns = buttons;
  let show_shipping_options = process.env.SHOW_CHECKOUT_SHIPPING_FORM;

  if (show_shipping_options === "false") {
    btns = buttons?.filter((button) => button.tab !== "shipping");
  }

  return (
    <div
      className={`sticky top-5 col-span-5 flex !h-fit flex-col gap-3 border bg-white p-4 shadow max-md:row-start-2 md:col-span-1`}
    >
      <Suspense
        fallback={<div className={`h-5 w-full animate-pulse bg-slate-300`} />}
      >
        <SidebarBasic />
      </Suspense>
      {(btns ?? [])?.map(({ tab, id, title }) => {
        return (
          <Button id={id} key={id} tab={tab} title={title} type={`sidebar`} />
        );
      })}
    </div>
  );
};
