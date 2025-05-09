function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((el, i) => (
        <button
          key={el}
          className={`btn btn-option  
            ${hasAnswered && i === answer ? "answer" : ""}  
            ${hasAnswered && i === question.correctOption ? "correct" : "wrong"}
            ${
              hasAnswered &&
              i === answer &&
              answer !== question.correctOption &&
              "wrongChoice"
            } 

            `}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          disabled={hasAnswered}
        >
          {el}
        </button>
      ))}
    </div>
  );
}

export default Options;
