"use client";

import Link from "next/link";
import { Fragment } from "react";

const getPaginationArray = (current, total) => {
  const delta = 2;
  const range = [];

  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(total, current + delta);
    i++
  ) {
    range.push(i);
  }

  return range;
};

const BrandsPagination = ({ pagination, setPage, handleQueryString }) => {
  const { selected_page, total_pages } = pagination;

  return (
    <div className="flex w-full items-center gap-2">
      {selected_page > 1 && (
        <Link
          href={handleQueryString(selected_page - 2)}
          className="flex h-10 w-fit items-center justify-center bg-white px-5 hover:bg-primary hover:text-white"
          onClick={() => {
            setPage(selected_page - 1);
            window.scrollTo(0, 0);
          }}
        >
          Prethodna
        </Link>
      )}

      {getPaginationArray(selected_page, total_pages).map(
        (num, index, array) => (
          <Fragment key={index}>
            {index === 0 && num !== 1 && (
              <>
                <Link
                  href={handleQueryString(0)}
                  className="flex h-10 w-10 min-w-10 items-center justify-center bg-white hover:bg-primary hover:text-white"
                  onClick={() => {
                    setPage(1);
                    window.scrollTo(0, 0);
                  }}
                >
                  1
                </Link>
                {num - 1 !== 1 && (
                  <span className="flex h-10 w-10 min-w-10 items-center justify-center">
                    ...
                  </span>
                )}
              </>
            )}

            {index > 0 && num - array[index - 1] > 1 && (
              <span className="flex h-10 w-10 min-w-10 items-center justify-center">
                ...
              </span>
            )}

            <Link
              href={handleQueryString(num - 1)}
              className={`${
                num === selected_page
                  ? "flex h-10 w-10 min-w-10 items-center justify-center bg-primary text-white"
                  : "flex h-10 w-10 min-w-10 items-center justify-center bg-white hover:bg-primary hover:text-white"
              }`}
              onClick={() => {
                setPage(num);
                window.scrollTo(0, 0);
              }}
            >
              {num}
            </Link>

            {index === array.length - 1 && num !== total_pages && (
              <>
                {total_pages - num !== 1 && (
                  <span className="flex h-10 w-10 min-w-10 items-center justify-center">
                    ...
                  </span>
                )}
                <Link
                  href={handleQueryString(total_pages - 1)}
                  className="flex h-10 w-10 min-w-10 items-center justify-center bg-white hover:bg-primary hover:text-white"
                  onClick={() => {
                    setPage(total_pages);
                    window.scrollTo(0, 0);
                  }}
                >
                  {total_pages}
                </Link>
              </>
            )}
          </Fragment>
        ),
      )}

      {selected_page < total_pages && (
        <Link
          href={handleQueryString(selected_page)}
          className="flex h-10 w-fit items-center justify-center bg-white px-5 hover:bg-primary hover:text-white"
          onClick={() => {
            setPage(selected_page + 1);
            window.scrollTo(0, 0);
          }}
        >
          Sledeća
        </Link>
      )}
    </div>
  );
};

export default BrandsPagination;
