import axios, { AxiosResponse } from "axios";
import {
  ICheckResponse,
  ICreateExerciseParams,
} from "@/servises/ExerciseService/types";
import { IInfoResponse } from "@/servises/types";
import { IAnswerCheck } from "@/types";

export const createExercise = async (
  exerciseToCreate: ICreateExerciseParams,
): Promise<IInfoResponse> => {
  try {
    const response: AxiosResponse<{ status: number; message: string }> =
      await axios.post(`${process.env.BASE_API_URL}/exercise/create`, {
        title: exerciseToCreate.title,
        questions: exerciseToCreate.questions.map((question) => {
          return {
            title: question.title,
            answers: question.answers.map((answer) => ({
              text: answer.text,
              isCorrectAnswer: answer.isCorrectAnswer,
            })),
          };
        }),
      });

    return {
      message: "access",
      status: response.status,
    };
  } catch (e) {
    const { data, status } = e.response;
    return {
      status: status,
      message: data.message,
    };
  }
};

export const checkExercise = async (
  answers: IAnswerCheck[],
  exerciseId: string,
): Promise<ICheckResponse> => {
  try {
    const response = await axios.post(
      `${process.env.BASE_API_URL}/exercise/check`,
      {
        answers,
        exerciseId,
      },
    );

    return response.data;
  } catch (e) {
    const { data } = e.response;
    alert(data.message);
    return {
      answers: null,
      mark: null,
    };
  }
};
