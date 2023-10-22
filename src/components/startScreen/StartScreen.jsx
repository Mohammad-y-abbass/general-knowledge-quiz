import "./startScreen.css";
const StartScreen = ({ dispatch }) => {
  return (
    <div className="startContainer">
      <h1>15 questions to test you knowledge</h1>
      <button className="startBtn" onClick={() => dispatch({ type: "START_QUIZ" })}>
        START
      </button>
    </div>
  );
};

export default StartScreen;
