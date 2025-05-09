function FinishedScreen({ points, questions, highestScore, dispatch }) {
  const maxPoints = questions.reduce((acc, el) => el.points + acc, 0);
  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥇";
  if (percentage >= 50 && percentage < 80) emoji = "😎";
  if (percentage > 0 && percentage < 50) emoji = "😐";
  if (percentage === 0) emoji = "💩";
  return (
    <>
      <p className="result">
        {emoji} You Scored <strong> {points} </strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highestscore: {highestScore} points</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishedScreen;
