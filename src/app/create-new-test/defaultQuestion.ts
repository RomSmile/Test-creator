import { IQuestion } from "@/store/testReducer/typesReducer";
import { v4 as uuidv4 } from 'uuid';
import router from 'next/router';

export const getDefaultAnswer = () => {
	return {
		answerId: uuidv4(),
		answerText: '',
		isCorrect: false,
	}
}

export const getDefaultValueForQuestion = () => {
	return {
		questionId: uuidv4(),
		questionText: '',
		answers: [
			getDefaultAnswer(),
			getDefaultAnswer(),
		]
	}
}

export const getDefaultQuestions = (): IQuestion[] => {
	return [
		getDefaultValueForQuestion(),
		getDefaultValueForQuestion(),
	]
}
