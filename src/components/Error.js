function Error({ errorMsg }) {
  return (
    <p className="error">
      <span>💥 {errorMsg} 💥</span>
    </p>
  );
}

export default Error;
