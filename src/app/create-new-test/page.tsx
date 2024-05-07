"use client";
import { QuestionCreate } from "../../components";
import { useState } from "react";
import {
  getDefaultAnswer,
  getDefaultQuestions,
  getDefaultValueForQuestion,
} from "./defaultQuestion";
import s from "./page.module.scss";
import { IQuestionCreate } from "@/servises/ExerciseService/types";
import { createExercise } from "@/servises/ExerciseService";

export default function CreateNewTest() {
  const [questions, setQuestions] = useState<IQuestionCreate[]>(
    getDefaultQuestions(),
  );
  const [testTitle, setTestTitle] = useState<string>("");

  const setAnswerText = (event, questionIndex: number, answerIndex: number) => {
    setQuestions((questions) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].answers[answerIndex].text =
        event.target.value;
      return newQuestions;
    });
  };

  const setCorrectAnswer = (questionIndex: number, answerIndex: number) => {
    setQuestions((questions) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].answers = questions[
        questionIndex
      ].answers.map((item, index) => {
        if (answerIndex === index) {
          item.isCorrectAnswer = true;
        } else {
          item.isCorrectAnswer = false;
        }

        return item;
      });

      return newQuestions;
    });
  };

  const setQuestionText = (event, questionIndex: number) => {
    setQuestions((questions) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].title = event.target.value;

      return newQuestions;
    });
  };

  const addNewQuestion = () => {
    setQuestions([...questions, getDefaultValueForQuestion()]);
  };

  const addNewAnswer = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers = [
      ...newQuestions[questionIndex].answers,
      getDefaultAnswer(),
    ];

    setQuestions(newQuestions);
  };

  const deleteAnswer = (questionIndex: number, answerIndex: number) => {
    setQuestions((questions) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].answers.splice(answerIndex, 1);

      return newQuestions;
    });
  };

  const deleteQuestion = (questionIndex: number) => {
    setQuestions((questions) => {
      const newQuestions = [...questions];
      newQuestions.splice(questionIndex, 1);

      return newQuestions;
    });
  };

  async function createTest() {
    let isValid = true;

    if (!testTitle) isValid = false;

    questions.forEach((item) => {
      if (!item.title) isValid = false;

      if (item.answers.every((item) => !item.isCorrectAnswer)) {
        isValid = false;
      }

      item.answers.forEach((item) => {
        if (!item.text) isValid = false;
      });
    });

    if (isValid) {
      const response = await createExercise({
        title: testTitle,
        questions: questions,
      });

      if (response.status === 200) {
        alert("ok");
      } else {
        alert("ne ok");
      }
    } else {
      alert("You have some errors in your test, you can't add it");
    }
  }

  return (
    <div className={s.questionsContainer}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Enter the title of test !</h2>
        <input
          value={testTitle}
          type="text"
          onChange={(e) => setTestTitle(e.target.value)}
          placeholder="Enter the title of test"
          className={s.testTitle}
        />
      </div>
      {questions.map((item, index) => (
        <QuestionCreate
          key={item.id}
          title={item.title}
          answers={item.answers}
          questionIndex={index}
          questionsLength={questions.length}
          setAnswerText={setAnswerText}
          setCorrectAnswer={setCorrectAnswer}
          setQuestionText={setQuestionText}
          addNewAnswer={addNewAnswer}
          deleteAnswer={deleteAnswer}
          deleteQuestion={deleteQuestion}
        />
      ))}
      <button className={s.questionButtons} onClick={() => addNewQuestion()}>
        Add new question
      </button>
      <button
        className={s.questionButtons}
        onClick={() => {
          createTest();
        }}
        style={{ marginTop: "15px" }}
      >
        Create test
      </button>
    </div>
  );
}
