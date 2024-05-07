import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FC } from "react";
import s from "./style.module.scss";
import { IQuestionRead } from "../types";

const QuestionRead: FC<IQuestionRead> = ({
  item,
  questionIndex,
  isTestFinished,
  selectAnswer,
}) => {
  return (
    <div className={s.questionContainer}>
      <FormControl>
        <FormLabel
          id="demo-radio-buttons-group-label"
          style={{ color: "#e6e6e6" }}
        >
          {item.questionTitle}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {item.answers.map((answer, answerIndex) => {
            return (
              <div className={s.answerContainer} key={answerIndex}>
                <div style={{ display: "flex" }}>
                  <FormControlLabel
                    control={<Radio />}
                    style={{
                      color: isTestFinished
                        ? answer.isSelected
                          ? answer.isCorrect
                            ? "green"
                            : "red"
                          : "#fff"
                        : "#fff",
                    }}
                    label={answer.answerTitle}
                    checked={answer.isSelected}
                    onClick={() => selectAnswer(questionIndex, answerIndex)}
                  />
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default QuestionRead;
