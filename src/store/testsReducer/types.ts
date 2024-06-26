import { IExercise } from "@/types";

export type IExerciseListItem = Omit<IExercise, "questions">;

export interface IGetTestsResponse {
  items: IExerciseListItem[];
  lastPage: number;
}

export interface ITestsReducer {
  tests: IExerciseListItem[] | null;
  lastPage: number | null;
  error: string;
  loading: boolean;
}
