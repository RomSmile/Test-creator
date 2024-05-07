import { IAnswer, IExercise, IQuestion } from "@/types";

export type IAnswerCreate = Omit<
  IAnswer,
  "questionId" | "exerciseId" | "isCorrect"
>;

export interface IQuestionCreate
  extends Omit<IQuestion, "exerciseId" | "answers"> {
  answers: IAnswerCreate[];
}

export interface ICreateExerciseParams {
  title: string;
  questions: IQuestionCreate[];
}
