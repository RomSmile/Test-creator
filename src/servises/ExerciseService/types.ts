import { IAnswer, IQuestion } from "@/types";

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

export interface IAnswersCheckResponse {
  id: string;
  isCorrectAnswer: boolean;
  questionId: string;
  exerciseId: string;
}

export interface ICheckResponse {
  answers: IAnswersCheckResponse[] | null;
  mark: number | null;
}
