export interface IAnswer {
  id: string;
  answerText: string;
  isCorrect: boolean;
}

export interface IQuestion {
  id: string;
  questionText: string;
  answers: IAnswer[];
}

export interface ITest {
  id: string;
  title: string;
  questions: IQuestion[];
}

export interface ITestReducer {
  tests: ITest[];
}
