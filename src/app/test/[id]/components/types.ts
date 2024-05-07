export interface IReadTest {
  id: string;
}

export interface IValidateAnswerItem {
  isSelected: boolean;
  answerTitle: string;
  isError: boolean;
  isCorrect: boolean;
}

export interface IValidateArrayItem {
  questionTitle: string;
  answers: IValidateAnswerItem[];
}

export interface IQuestionRead {
  item: IValidateArrayItem;
  questionIndex: number;
  isTestFinished: boolean;
  selectAnswer: (questionIndex: number, answerIndex: number) => void;
}
