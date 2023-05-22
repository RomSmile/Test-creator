'use client'
import QuestionCreate from "@/compoenents/QuestionCreate";
import { TestSlice } from "@/store/testReducer/testReducer";
import { IQuestion } from "@/store/testReducer/typesReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { getDefaultAnswer, getDefaultQuestions, getDefaultValueForQuestion } from "./defaultQuestion";
import s from './page.module.scss';
import { v4 as uuidv4 } from 'uuid';

export default function CreateNewTest() {
	const [ questions, setQuestions ] = useState<IQuestion[]>(getDefaultQuestions());
	const [ testTitle, setTestTitle ] = useState<string>('');
	const dispatch = useDispatch();

	const testActions = bindActionCreators(TestSlice.actions, dispatch);


	const setAnswerText = (event, questionIndex: number, answerIndex: number) => {
		setQuestions((questions) => {
			const newQuestions = [...questions];
			newQuestions[questionIndex].answers[answerIndex].answerText
				= event.target.value;
			return newQuestions;
		})
	}

	const setCorrectAnswer = (questionIndex: number, answerIndex: number) => {
		setQuestions((questions) => {
			const newQuestions = [...questions];
			newQuestions[questionIndex].answers = questions[questionIndex].answers.map((item, index) => {
				if (answerIndex === index) {
					item.isCorrect = true;
				} else {
					item.isCorrect = false
				}

				return item;
			})

			return newQuestions
		})
	}

	const setQuestionText = (event, questionIndex: number) => {
		setQuestions((questions) => {
			const newQuestions = [...questions];
			newQuestions[questionIndex].questionText = event.target.value;

			return newQuestions;
		})
	}

	const addNewQuestion = () => {
		setQuestions([...questions, getDefaultValueForQuestion()])
	}

	const addNewAnswer = (questionIndex: number) => {
		setQuestions((questions) => {
			const newQuestions = [...questions];
			newQuestions[questionIndex].answers
				= [ ...questions[questionIndex].answers, getDefaultAnswer()];

			return newQuestions;
		})
	}

	const deleteAnswer = (questionIndex: number, answerIndex: number) => {
		setQuestions((questions) => {
			const newQuestions = [...questions];
			newQuestions[questionIndex].answers.splice(answerIndex, 1);

			return newQuestions;
		});
	}

	const deleteQuestion = (questionIndex: number) => {
		setQuestions((questions) => {
			const newQuestions = [...questions];
			newQuestions.splice(questionIndex, 1);

			return newQuestions;
		})
	}

	function createTest() {
		let isValid = true;

		if (!testTitle) isValid = false;

		questions.forEach((item) => {
			if (!item.questionText) isValid = false;

			if (item.answers.every((item) => !item.isCorrect)) {
				isValid = false;
			}

			item.answers.forEach((item) => {
				if (!item.answerText) isValid = false;
			})
		})

		if (isValid) {
			testActions.addTest({
				testId: uuidv4(),
				title: testTitle,
				questions: questions,
			});
					
			document.location.href
				= `${document.location.href.split('/')[0]}//${document.location.href.split('/')[2]}`;
		} else {
			alert("You have some errors in your test, you can't add it")
		}
	}

	return (
		<div className={s.questionsContainer}>
			<div style={{ display: 'flex', flexDirection: 'column'}}>
				<h2>Enter the title of test !</h2>
				<input
					value={testTitle}
					type="text"
					onChange={(e) => setTestTitle(e.target.value)}
					placeholder="Enter the title of test"
					className={s.testTitle}
				/>
			</div>
			{questions.map((item, index) => 
				<QuestionCreate
					key={item.questionId}
					item={item}
					questionIndex={index}
					questionsLength={questions.length}
					setAnswerText={setAnswerText}
					setCorrectAnswer={setCorrectAnswer}
					setQuestionText={setQuestionText}
					addNewAnswer={addNewAnswer}
					deleteAnswer={deleteAnswer}
					deleteQuestion={deleteQuestion}
				/>
			)}
			<button
				className={s.questionButtons}
				onClick={() => addNewQuestion()}
			>
				Add new question
			</button>
			<button
				className={s.questionButtons}
				onClick={() => {
					createTest()
				}}
				style={{ marginTop: '15px' }}
			>
				Create test
			</button>
		</div>
	);
}