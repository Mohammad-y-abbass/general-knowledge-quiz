import { useEffect, useState } from "react";
import "./questions.css";

const Questions = ({ questions, index, dispatch, correctAnswer }) => {
  const hasAnswered = correctAnswer !== null;

  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    const answers = [
      ...questions[index].incorrect_answers,
      questions[index].correct_answer,
    ];
    setShuffledAnswers(shuffle(answers));
  }, [questions, index]);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="questions">
      <p className="question">{questions[index].question}</p>
      <div className="answers">
        {shuffledAnswers.map((answer, ansIndex) => (
          <button
            key={ansIndex}
            className={`answer ${
              hasAnswered
                ? answer === questions[index].correct_answer
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => {
              dispatch({ type: "CORRECT_ANSWER", payload: ansIndex });
            }}
          >
            {answer}
          </button>
        ))}
      </div>
      <button
        className="btn"
        onClick={() => {
          questions.length - 1 === index
            ? dispatch({ type: "END_QUIZ" })
            : dispatch({ type: "NEXT_QUESTION" });
        }}
      >
        Next Question
      </button>
    </div>
  );
};

export default Questions;
