"use client";
import Image from "next/image";
import Link from "next/link";
export const metadata = () => {
  return {
    title: "404 - Anker",
    description: "Dobrodošli na Anker Online Shop",
  };
};
const notFound = () => {
  return (
    <div className="sectionPaddingY flex flex-col items-center justify-center text-center ">
      <div className="border bg-lightGray p-10">
        <Image src={"/icons/404.png"} alt="404" width={100} height={100} className="mx-auto mb-10" />
        <h1 className="font-bold text-[18px]">
          Stranica koju tražite ne postoji ili je premeštena.
        </h1>
        <h2 className="font-normal text-[15px] mt-3">
          Proverite da li ste uneli ispravan URL.
        </h2>
        <Link href="/">
          <button className="mainButton mt-5">
            Vrati se na početnu stranu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default notFound;
