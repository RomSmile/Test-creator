"use client";

import { FC, useState } from "react";
import QuestionRead from "../QuestionRead";
import { IReadTest, IValidateArrayItem } from "../types";
import Link from "next/link";
import s from "./style.module.scss";
import { checkExercise } from "@/servises/ExerciseService/ExersiceServise";
import { IAnswersCheckResponse } from "@/servises/ExerciseService/types";

const ReadTest: FC<IReadTest> = ({ test }) => {
  const [isTestFinished, setIsTestFinished] = useState<boolean>(false);
  const [ mark, setMark ] = useState<number | null>(null);

  const [validateArray, setValidateArray] = useState<IValidateArrayItem[]>(
    test.questions.map((question) => {
      return {
        questionTitle: question.title,
        answers: question.answers.map((answer) => {
          return {
            id: answer.id,
            questionId: question.id,
            exerciseId: test.id,
            answerTitle: answer.text,
            isSelected: false,
            isError: false,
            isCorrectAnswer: null,
          };
        }),
      };
    }),
  );

  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    if (isTestFinished) {
      return;
    }
    setValidateArray((validateArray) => {
      const newValidateArray = [...validateArray];
      newValidateArray[questionIndex].answers = validateArray[
        questionIndex
      ].answers.map((item, index) => {
        if (answerIndex === index) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }

        return item;
      });

      return newValidateArray;
    });
  };

  const finishTest = async () => {
    if (
      !validateArray.every((question) => {
        return question.answers.some((answer) => {
          return answer.isSelected;
        });
      })
    ) {
      alert("You should select one answer in all questions");
      return;
    }

    const response = await checkExercise(
      validateArray.reduce((acc, validateItem) => {
        return [
          ...acc,
          ...validateItem.answers.map(
            ({isSelected, id, questionId, exerciseId}) => ({isSelected, id, questionId, exerciseId})
          ).filter((answer) => answer.isSelected)
        ]
      }, []),
      test.id
    )

    if (response.answers === null || response.mark === null) {
      return;
    }

    const newValidateArray = [...validateArray].map(
      (question) => {
        const newQuestion = { ...question };
        newQuestion.answers = newQuestion.answers.map((answer, answerIndex) => {
          const responseAnswer = (response.answers as IAnswersCheckResponse[]).find((responseAnswer) => answer.id === responseAnswer.id);
          if (responseAnswer) {
            return {
              ...answer,
              ...responseAnswer
            }
          }
          return answer;
        });
        return newQuestion;
      },
    );

    setMark(response.mark)
    setValidateArray([...newValidateArray]);
    setIsTestFinished(true);
  };

  return (
    <div className={s.questionsContainer}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>{test.title}</h1>
      </div>
      {validateArray.map((item, index) => (
        <QuestionRead
          key={index}
          item={item}
          questionIndex={index}
          selectAnswer={selectAnswer}
          isTestFinished={isTestFinished}
        />
      ))}
      {isTestFinished ? (
        <>
          <div>
            Your mark: {mark}/{test.questions.length}
          </div>
          <Link href="/" className={s.testButtons}>
            Back to list
          </Link>
        </>
      ) : (
        <button className={s.testButtons} onClick={() => finishTest()}>
          finish test
        </button>
      )}
    </div>
  );
};

export default ReadTest;
