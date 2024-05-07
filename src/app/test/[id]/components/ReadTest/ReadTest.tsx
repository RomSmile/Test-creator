"use client";

import { UseAppSelector } from "@/hooks/redux";
import { FC, useState } from "react";
import QuestionRead from "../QuestionRead";
import { IReadTest, IValidateArrayItem } from "../types";
import Link from "next/link";
import s from "./style.module.scss";
import { IExercise as ITest } from "@/types";

const ReadTest: FC<IReadTest> = ({ id }) => {
  const { tests } = UseAppSelector((state) => state.testReducer);
  const [currentTest] = useState<ITest>(tests.find((item) => item.id === id));
  const [isTestFinished, setIsTestFinished] = useState<boolean>(false);

  const [validateArray, setValidateArray] = useState<IValidateArrayItem[]>(
    currentTest.questions.map((question) => {
      return {
        questionTitle: question.questionText,
        answers: question.answers.map((answer) => {
          return {
            answerTitle: answer.answerText,
            isSelected: false,
            isError: false,
            isCorrect: answer.isCorrect,
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

  const finishTest = () => {
    if (
      !validateArray.every((question) => {
        return question.answers.some((answer) => {
          return answer.isSelected;
        });
      })
    ) {
      alert("You select one answer in all questions");
      return;
    }

    const newValidateArray = [...validateArray].map(
      (question, questionIndex) => {
        const newQuestion = { ...question };
        newQuestion.answers = newQuestion.answers.map((answer, answerIndex) => {
          if (
            currentTest.questions[questionIndex].answers[answerIndex]
              .isCorrect &&
            answer.isSelected
          ) {
            answer.isCorrect = true;
          } else {
            answer.isCorrect = false;
          }

          return answer;
        });

        return newQuestion;
      },
    );

    setValidateArray([...newValidateArray]);
    setIsTestFinished(true);
  };

  return (
    <div className={s.questionsContainer}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>{currentTest.title}</h1>
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
        <Link href="/" className={s.testButtons}>
          Back to list
        </Link>
      ) : (
        <button className={s.testButtons} onClick={() => finishTest()}>
          finish test
        </button>
      )}
    </div>
  );
};

export default ReadTest;
