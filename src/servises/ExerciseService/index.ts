import {
  IQuestionCreate,
  IAnswerCreate,
  ICreateExerciseParams,
} from "@/servises/ExerciseService/types";
import { createExercise, getExercises } from "./ExersiceServise";

export type { IQuestionCreate, IAnswerCreate, ICreateExerciseParams };
export { createExercise, getExercises };
