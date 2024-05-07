import {
  IAnswerCreate,
  IQuestionCreate,
} from "@/servises/ExerciseService/types";
import { v4 as uuidv4 } from "uuid";

export const getDefaultAnswer = (): IAnswerCreate => {
  return {
    id: uuidv4(),
    text: "",
    isCorrectAnswer: false,
  };
};

export const getDefaultValueForQuestion = (): IQuestionCreate => {
  return {
    id: uuidv4(),
    title: "",
    answers: [getDefaultAnswer(), getDefaultAnswer()],
  };
};

export const getDefaultQuestions = (): IQuestionCreate[] => {
  return [getDefaultValueForQuestion(), getDefaultValueForQuestion()];
};
