import { IQuestion } from "@/store/testReducer/typesReducer"
import {
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from "react";
import s from './style.module.scss';

interface IQuestionCreate {
	item: IQuestion;
	questionIndex: number;
	questionsLength: number;
	setAnswerText: (event: any, questionIndex: number, answerIndex: number) => void;
	setCorrectAnswer: (questionIndex: number, answerIndex: number) => void;
	setQuestionText: (event: any, questionIndex: number) => void;
	addNewAnswer: (questionIndex: number) => void;
	deleteAnswer: (questionIndex: number, answerIndex: number) => void;
	deleteQuestion: (questionIndex: number) => void;
}

const QuestionCreate: FC<IQuestionCreate> = ({
	item,
	questionIndex,
	questionsLength,
	setAnswerText,
	setCorrectAnswer,
	setQuestionText,
	addNewAnswer,
	deleteAnswer,
	deleteQuestion,
}) => {
	const inputLabel = 'Enter the answer description';
  return (
		<div className={s.questionContainer}>
			<label>
				<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
					<p>Let&apos;s enter the question number {questionIndex + 1}!</p>
					<IconButton
						aria-label="delete"
						onClick={() =>{
							if (questionsLength > 2) {
								deleteQuestion(questionIndex);
							} else {
								alert("You can't delete it")
							}
						}}
					>
						<DeleteIcon />
					</IconButton>
				</div>
				<input
					value={item.questionText}
					onChange={(e) => setQuestionText(e, questionIndex)}
					placeholder="Enter the question"
					className={s.question}
				/>
			</label>
			<FormControl>
				<FormLabel
					id="demo-radio-buttons-group-label"
					style={{color: '#e6e6e6'}}
				>
					Choose a correct answer of question
				</FormLabel>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					name="radio-buttons-group"
				>	
					{item.answers.map((answer, answerIndex) => {
						return(
							<div className={s.answerContainer} key={answer.answerId}>
								<input
									type="text"
									className={s.answerDescription}
									placeholder={inputLabel}
									value={answer.answerText}
									onChange={(e) => setAnswerText(e, questionIndex, answerIndex)}
								/>
								<div style={{ display: 'flex' }}>
									<FormControlLabel
										value={answer.answerId}
										control={<Radio />}
										color="primary"
										label={`Answer: ${answerIndex + 1}`}
										checked={answer.isCorrect}
										onClick={() => setCorrectAnswer(questionIndex, answerIndex)}
									/>
									<IconButton
										aria-label="delete"
										onClick={() =>{
											if (item.answers.length > 2) {
												deleteAnswer(questionIndex, answerIndex);
											} else {
												alert("You can't delete it")
											}
										}}
									>
										<DeleteIcon />
									</IconButton>
								</div>
							</div>
						)
					})}
				</RadioGroup>
			</FormControl>
			<button
				className={s.addNewAnswerButton}
				onClick={() => {
					addNewAnswer(questionIndex)
				}}
			>
				Add new answer
			</button>
		</div>
	)
}

export default QuestionCreate;
