export interface IExercise {
  id: string;
  title: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id: string;
  title: string;
  exerciseId: string;
  answers: IAnswer[];
}

export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
  questionId: string;
  exerciseId: string;
  isCorrectAnswer: boolean;
}

export interface IAnswerRead extends Omit<IAnswer, 'isCorrect'> {}

export interface IQuestionRead extends Omit<IQuestion, 'answers'> {
  answers: IAnswerRead[];
}

export interface IExerciseRead extends Omit<IExercise, 'questions'> {
  questions: IQuestionRead[];
}

export interface IAnswerCheck {
  id: string;
  isSelected: boolean;
  questionId: string;
  exerciseId: string;
}
