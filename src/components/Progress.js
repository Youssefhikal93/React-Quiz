function Progress({ questions, index, points, answer }) {
  const totalPoints = questions.reduce((acc, el) => el.points + acc, 0);
  const questionsNumber = questions.length;
  return (
    <header className="progress">
      <progress max={questionsNumber} value={index + Number(answer !== null)} />
      <p>
        Question: <strong>{index + 1}</strong>/{questionsNumber}
      </p>

      <p>
        <strong>{points}</strong>/{totalPoints} points
      </p>
    </header>
  );
}

export default Progress;
