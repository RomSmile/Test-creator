import React from "react";

export interface IPagination {
  currentPage: number;
  lasPage: number;
  onNextPage: (e?: React.MouseEvent<HTMLElement>) => void;
  onPreviousPage: (e?: React.MouseEvent<HTMLElement>) => void;
  setPageNumber: (newPage: number) => () => void;
}
