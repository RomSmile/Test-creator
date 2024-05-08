"use client";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, UseAppSelector } from "@/hooks/redux";
import { getTests } from "@/store/testReducer/testsActions";
import { useRouter } from "next/navigation";
import { replaceUrl } from "@/helpers";
import { Loader } from "@/components";
import { toast } from "react-toastify";
import { Pagination } from "@/components";
import SearchHeader from "@/forPages/MainPage/components/SearchHeader";
import TestListItem from "@/forPages/MainPage/components/TestListItem";
import SearchExercise from "@/forPages/MainPage/components/SearchExercise";
import "./style.scss";

const MainPage: FC<{ pageNumber: number }> = ({ pageNumber }) => {
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(pageNumber);
  const [searchValue, setSearchValue] = useState("");
  const [filter] = useDebounce(searchValue, 500, (newFilter: string) => {
    if (newFilter.length) {
      replace(
        replaceUrl({ page, ...(newFilter.length && { filter: newFilter }) }),
      );
      setPage(1);
    }
  });
  const { tests, lastPage, loading, error } = UseAppSelector(
    (state) => state.testReducer,
  );

  useEffect(() => {
    // fix hydration
    if (typeof window !== "undefined") {
      dispatch(
        getTests({
          page: page,
          ...(filter.length && { filter }),
        }),
      );
    }
  }, [page, filter, dispatch]);

  useEffect(() => {
    error?.length &&
      toast(error, {
        type: "error",
        onClose: () => {
          setPage(1);
        },
      });
  }, [error]);

  const onNextPage = (e: React.MouseEvent<HTMLElement>) => {
    if (page === lastPage) {
      e.preventDefault();
      return;
    }
    replace(replaceUrl({ page: page + 1, ...(filter.length && { filter }) }));
    setPage(page + 1);
  };

  const onPreviousPage = (e: React.MouseEvent<HTMLElement>) => {
    if (page === 1) {
      e.preventDefault();
      return;
    }
    replace(replaceUrl({ page: page - 1, ...(filter.length && { filter }) }));
    setPage(page - 1);
  };

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSetPageNumber = (pageNumber: number) => () => {
    replace(replaceUrl({ page: pageNumber, ...(filter.length && { filter }) }));
    setPage(pageNumber);
  };

  return (
    <>
      <SearchHeader />
      <SearchExercise value={searchValue} onChange={onChangeSearchValue} />
      <ul className="listOfUsers">
        {loading && <Loader />}
        {tests !== null && (
          <>
            {tests.map((item) => (
              <TestListItem test={item} key={item.id} />
            ))}
            <div className="sticky right-0 bottom-0 mt-5 flex justify-end">
              <Pagination
                currentPage={page}
                lasPage={lastPage as number}
                onNextPage={onNextPage}
                onPreviousPage={onPreviousPage}
                setPageNumber={onSetPageNumber}
              />
            </div>
          </>
        )}
      </ul>
    </>
  );
};

export default MainPage;
