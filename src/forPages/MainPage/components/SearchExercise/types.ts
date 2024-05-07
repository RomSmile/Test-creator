import { ChangeEvent } from "react";

export interface ISearchExercise {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
