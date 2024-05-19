import { IExerciseRead } from "@/types";

export interface IReadTest {
  test: IExerciseRead;
}

export interface IValidateAnswerItem {
  id: string;
  questionId: string;
  exerciseId: string;
  isSelected: boolean;
  answerTitle: string;
  isError: boolean;
  isCorrectAnswer: boolean | null;
}

export interface IValidateArrayItem {
  questionTitle: string;
  answers: IValidateAnswerItem[];
}

export interface IQuestionRead {
  item: IValidateArrayItem;
  questionIndex: number;
  isTestFinished: boolean;
  selectAnswer: (questionIndex: number, answerIndex: number) => void;
}
