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
