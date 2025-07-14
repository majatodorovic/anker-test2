"use client";

import Link from "next/link";
import { Fragment } from "react";

export const CategoryPagination = ({
  getPaginationArray = () => {},
  data,
  setPage,
  generateQueryString = () => {},
  withPagination = true,
}) => {
  let query_string = generateQueryString();

  const handleQueryString = (page) => {
    let new_string = query_string;
    let page_string = query_string?.split("strana=")?.[1];

    if (page_string) {
      new_string = query_string?.replace(
        `strana=${page_string}`,
        `strana=${page + 1}`,
      );
    }

    if (!page_string) {
      new_string = `${query_string}&strana=${page + 1}`;
    }
    return new_string;
  };

  return (
    <div className="mx-auto w-full bg-lightGray pb-20">
      <div className="sectionPaddingX">
        <div
          className={`flex w-full items-center gap-2 ${
            withPagination ? "xl:pl-[350px]" : ""
          }`}
        >
          {data.pagination.selected_page > 1 && (
            <Link
              href={handleQueryString(data.pagination.selected_page - 2)}
              className="flex h-10 w-fit cursor-pointer select-none items-center justify-center bg-white px-5 hover:bg-primary hover:text-white"
              onClick={() => {
                setPage(data.pagination.selected_page - 1);
                window.scrollTo(0, 0);
              }}
            >
              Prethodna
            </Link>
          )}
          {getPaginationArray(
            data.pagination.selected_page,
            data.pagination.total_pages,
          )?.map((num, index, array) => (
            <Fragment key={index}>
              {index === 0 && num !== 1 && (
                <>
                  <Link
                    href={`${handleQueryString(0)}`}
                    className="flex h-10 w-10 cursor-pointer select-none items-center justify-center bg-white hover:bg-primary hover:text-white"
                    onClick={() => {
                      setPage(1);
                      window.scrollTo(0, 0);
                    }}
                  >
                    1
                  </Link>
                  {num - 1 !== 1 && (
                    <span className="flex h-10 w-10 select-none items-center justify-center">
                      ...
                    </span>
                  )}
                </>
              )}
              {index > 0 && num - array[index - 1] > 1 && (
                <span className="flex h-10 w-10 select-none items-center justify-center">
                  ...
                </span>
              )}
              <Link
                href={`${handleQueryString(num - 1)}`}
                className={`${
                  num === data.pagination.selected_page
                    ? "flex h-10 w-10 cursor-pointer select-none items-center justify-center bg-primary text-white"
                    : "flex h-10 w-10 cursor-pointer select-none items-center justify-center bg-white hover:bg-primary hover:text-white"
                }`}
                onClick={() => {
                  setPage(num);
                  window.scrollTo(0, 0);
                }}
              >
                {num}
              </Link>
              {index === array.length - 1 &&
                num !== data.pagination.total_pages && (
                  <>
                    {data.pagination.total_pages - num !== 1 && (
                      <span className="flex h-10 w-10 select-none items-center justify-center">
                        ...
                      </span>
                    )}
                    <Link
                      href={`${handleQueryString(data.pagination.total_pages - 1)}`}
                      className="flex h-10 w-10 cursor-pointer select-none items-center justify-center bg-white hover:bg-primary hover:text-white"
                      onClick={() => {
                        setPage(data.pagination.total_pages);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {data.pagination.total_pages}
                    </Link>
                  </>
                )}
            </Fragment>
          ))}

          {data.pagination.selected_page < data.pagination.total_pages && (
            <Link
              href={handleQueryString(data.pagination.selected_page)}
              className="flex h-10 w-fit cursor-pointer select-none items-center justify-center bg-white px-5 hover:bg-primary hover:text-white"
              onClick={() => {
                setPage(data.pagination.selected_page + 1);
                window.scrollTo(0, 0);
              }}
            >
              Sledeća
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
