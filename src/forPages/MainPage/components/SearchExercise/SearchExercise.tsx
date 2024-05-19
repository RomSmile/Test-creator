import { FC } from "react";
import { ISearchExercise } from "@/forPages/MainPage/components/SearchExercise/types";
import "@/forPages/MainPage/style.scss";

const SearchExercise: FC<ISearchExercise> = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className="search"
      placeholder="Enter the test title..."
    />
  );
};

export default SearchExercise;
