"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortByPriceButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sortState, setSortState] = useState(null);

  // Kad učitamo komponentu, očitaj stanje iz URL-a
  useEffect(() => {
    const sortParam = searchParams.get("sort") ?? "";

    if (typeof sortParam === "string" && sortParam.includes("_")) {
      const [field, dir] = sortParam.split("_");
      if (field === "price") {
        if (dir === "asc" || dir === "desc") {
          setSortState(dir);
        }
      }
    }
  }, [searchParams]);

  const handleSortClick = () => {
    if (sortState === null) {
      setSortState("asc");
    } else if (sortState === "asc") {
      setSortState("desc");
    } else if (sortState === "desc") {
      setSortState(null);
    }
  };

  // Kad se promeni sortState, promeni URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (sortState === "asc") {
      params.set("sort", "price_asc");
    } else if (sortState === "desc") {
      params.set("sort", "price_desc");
    } else {
      params.delete("sort");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [sortState]);

  return (
    <button
      onClick={handleSortClick}
      className={`flex w-[150px] items-center justify-between gap-2 bg-primary px-4 py-2.5 text-white transition-all duration-300 ease-in-out hover:bg-primary hover:text-white ${sortState && "!bg-primary !text-white"}`}
    >
      <span className="text-base">Cena</span>
      {sortState && (
        <i
          className={`fa fa-solid fa-arrow-right text-base ${
            sortState === "asc" ? "-rotate-90" : "rotate-90"
          }`}
        ></i>
      )}
    </button>
  );
};

export default SortByPriceButton;
