export interface IAnswer {
  answerId: string;
  answerText: string;
  isCorrect: boolean;
}

export interface IQuestion {
  questionId: string;
  questionText: string;
  answers: IAnswer[];
}

export interface ITest {
  testId: string;
  title: string;
  questions: IQuestion[];
}

export interface ITestReducer {
  tests: ITest[];
}
