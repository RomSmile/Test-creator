"use client";
import { FC, useLayoutEffect, useState } from "react";
import { IPagination } from "@/components/Pagination/types";
import { getPagesArray } from "@/components/Pagination/helpers";

const similarStyles = `
  flex
  items-center
  justify-center
  px-4
  h-10
  leading-tight
  border
  border-gray-700
  text-gray-400
  hover:bg-gray-700
  hover:text-white
`;

const styleForLeftButton = `
  ${similarStyles}
  bg-gray-800
  ms-0
  border-e-0
  rounded-s-lg
`;

const styleForRightButton = `
  ${similarStyles}
  bg-gray-800
  rounded-e-lg
`;

const styleForCenterButton = `
  ${similarStyles}
`;

const Pagination: FC<IPagination> = ({
  currentPage,
  lasPage,
  onNextPage,
  onPreviousPage,
  setPageNumber,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  useLayoutEffect(() => {
    setPages(getPagesArray(currentPage, lasPage));
  }, [lasPage, currentPage]);

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <a href="#" className={styleForLeftButton} onClick={onPreviousPage}>
            Previous
          </a>
        </li>
        {pages.map((page) => (
          <li key={`page_${page}`} onClick={setPageNumber(page)}>
            <a
              href="#"
              className={`${styleForCenterButton} ${
                page === currentPage ? "bg-blue-700" : "bg-gray-800"
              }`}
            >
              {page}
            </a>
          </li>
        ))}
        <li>
          <a href="#" className={styleForRightButton} onClick={onNextPage}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
