import { useEffect, useReducer } from "react";
import Header from "../src/components/header/Header";
import StartScreen from "./components/startScreen/StartScreen";
import Loader from "./components/loader/Loader";
import Questions from "./components/questions/Questions";
import ProgressBar from "./components/progressBar/ProgressBar";

const initialState = {
  questions: [],
  status: "LOADING",
  index: 0,
  correctAnswer: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        status: "READY",
      };
    case "START_QUIZ":
      return {
        ...state,
        status: "ACTIVE",
      };
    case "CORRECT_ANSWER":
      return {
        ...state,
        correctAnswer: true,
        correctAnswers: state.correctAnswers + 1,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        index: state.index + 1,
        correctAnswer: null,
      };
    case "END_QUIZ":
      return {
        ...state,
        status: "END",
        index: 0,
      };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=15&category=22&difficulty=medium&type=multiple"
      );
      const data = await res.json();
      dispatch({ type: "FETCHED_QUESTIONS", payload: data.results });
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <main>
        {state.status === "LOADING" && <Loader />}
        {state.status === "READY" && (
          <>
            <Header />
            <StartScreen dispatch={dispatch} />
          </>
        )}
        {state.status === "ACTIVE" && (
          <>
            <ProgressBar index={state.index} questionNb={state.questions} />
            <Questions
              questions={state.questions}
              index={state.index}
              dispatch={dispatch}
              correctAnswer={state.correctAnswer}
            />
          </>
        )}
        {state.status === "END" && (
          <div className="endContainer">
            <h1 className="endTitle">End of the quiz</h1>
            <button
              className="btn"
              onClick={() => {
                dispatch({ type: "START_QUIZ" });
              }}
            >
              RESTART
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
