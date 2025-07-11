"use client";

import { Sidebar } from "@/_pages/account/sidebar";
import { AccountData } from "@/_pages/account/account-data/shared";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

export const Account = () => {
  return (
    <>
      <BreadcrumbsStatic breadcrumbs={[{ name: "Profil", url: "/nalog" }]} />
      <div className={`sectionPaddingX grid grid-cols-5 gap-5`}>
        <Sidebar />
        <AccountData />
      </div>
    </>
  );
};
