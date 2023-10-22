import "./progressBar.css";
const ProgressBar = ({ index, questionNb }) => {
  const numberOfQuestions = !questionNb ? 1 : questionNb.length ;
  return (
    <div className="progressBar">
      <progress value={index + 1} max={numberOfQuestions}></progress>
      <h1>
        {index + 1}/{numberOfQuestions}
      </h1>
    </div>
  );
};

export default ProgressBar;
