export function NextButton({ dispatch, answer, index, questionsNum }) {
  const hasAnswered = answer !== null;

  if (index < questionsNum - 1)
    return (
      hasAnswered && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )
    );

  if (index === questionsNum - 1 && hasAnswered)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
