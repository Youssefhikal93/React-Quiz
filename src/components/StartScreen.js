function StartScreen({ questionsCount, dispatch }) {
  return (
    <>
      <div>
        <h2>Welcom to the React Quaiz!</h2>
        <h3>{questionsCount} questions to test your React knowlgde 😎</h3>
        <button
          onClick={() => dispatch({ type: "start" })}
          className="btn btn-ui"
        >
          Let's start
        </button>
      </div>
    </>
  );
}

export default StartScreen;
