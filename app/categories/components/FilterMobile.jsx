"use client";

import { sortKeys } from "@/helpers/const";
import { useState } from "react";
import Filter from "./Filter";

const FiltersMobile = ({
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  tempSelectedFilters,
  setTempSelectedFilters,
  setSort,
  sort,
  setChangeFilters,
  setFilterOpen,
  setLastSelectedFilterKey,
  setPage,
}) => {
  const [openIndex, setOpenIndex] = useState({
    key: null,
  });

  const [activeSort, setActiveSort] = useState({ label: "" });
  const [sortingActive, setSortingActive] = useState(false);
  return (
    <>
      <div className="flex h-full flex-col px-[0.7rem]">
        <div
          className={`sticky top-0 flex w-full items-center justify-center border-b py-3 text-center`}
        >
          <h1 className="mx-auto self-center text-center text-[1rem] font-light text-[#171717]">
            Filteri
          </h1>
          <i
            className={`fas fa-times mr-3 cursor-pointer text-[1.44rem] text-[#171717]`}
            onClick={() => setFilterOpen(false)}
          ></i>
        </div>
        <div className="mx-auto flex w-[95%] flex-col overflow-hidden border-b border-b-[#f5f5f5] py-[23px]">
          <div
            className="flex cursor-pointer flex-row items-center justify-between"
            onClick={() => setSortingActive(!sortingActive)}
          >
            <h1 className="text-[1rem] font-light">Sortiranje</h1>
            <div className="flex cursor-pointer items-center">
              <p className="text-[1.2rem] font-light">
                {sortingActive ? "-" : "+"}
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={
                sortingActive
                  ? `mt-0 flex flex-row flex-wrap gap-3 py-[20px] transition-all duration-[750ms]`
                  : `-mt-52 flex flex-row flex-wrap gap-3 py-[20px] transition-all duration-[750ms]`
              }
            >
              {sortKeys?.map((item, index) => {
                const isActive = activeSort?.label === item?.label;
                return (
                  <div
                    key={index}
                    className={
                      isActive && sort.field !== "" && sort.direction !== ""
                        ? `cursor-pointer select-none border-2 border-primary bg-primary px-3 py-[10px] font-medium text-white`
                        : `cursor-pointer select-none border-2 border-[#e8e8e8] px-3 py-[10px]`
                    }
                    onClick={() => {
                      setActiveSort({
                        label:
                          activeSort?.label === item?.label
                            ? null
                            : item?.label,
                      });
                      setSort({
                        field: item?.field,
                        direction: item?.direction,
                      });
                    }}
                  >
                    <p className="text-[13px] font-light">{item?.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {availableFilters?.map((filter, index) => {
          const isOpen = openIndex.key === filter.key;
          return (
            <div key={index}>
              <div
                className="mx-auto flex w-[95%] cursor-pointer select-none items-center justify-between border-b border-b-[#f5f5f5] py-[1.375rem]"
                onClick={() =>
                  setOpenIndex({
                    key: openIndex?.key === filter?.key ? null : filter?.key,
                  })
                }
                key={filter?.key}
              >
                <h1 className="text-[1rem] font-light">
                  {filter?.attribute?.name}
                </h1>
                <div>
                  <h1 className={`text-[1.2rem] font-light text-[#171717]`}>
                    {isOpen ? `-` : `+`}
                  </h1>
                </div>
              </div>
              <div className="mx-auto w-[95%] overflow-hidden">
                <div
                  className={
                    isOpen
                      ? `mt-[15px] block h-auto translate-y-0 transition-all duration-[750ms]`
                      : `hidden h-min -translate-y-full transition-all duration-[750ms]`
                  }
                >
                  <Filter
                    filter={filter}
                    selectedFilters={selectedFilters}
                    setTempSelectedFilters={setTempSelectedFilters}
                    setChangeFilters={setChangeFilters}
                    setSelectedFilters={setSelectedFilters}
                    setPage={setPage}
                    setLastSelectedFilterKey={setLastSelectedFilterKey}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div
          className={`sticky bottom-0 mt-auto flex items-center justify-center divide-x`}
        >
          <button
            className={`flex-1`}
            onClick={() => {
              setTempSelectedFilters([]);
              setSelectedFilters([]);
              setFilterOpen(false);
            }}
          >
            <h1 className={`py-3 text-center text-[1.2rem] font-light`}>
              Resetuj
            </h1>
          </button>
          <button
            className={`flex-1`}
            onClick={() => {
              setSelectedFilters(tempSelectedFilters);
              setFilterOpen(false);
            }}
          >
            <h1 className={`py-3 text-center text-[1.2rem] font-light`}>
              Primeni
            </h1>
          </button>
        </div>
      </div>
    </>
  );
};

export default FiltersMobile;
