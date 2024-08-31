function Button({ color, isButtonDisabled, text }) {
  return (
    <button
      className={`${
        isButtonDisabled
          ? `bg-${color}-200`
          : `bg-${color}-500 cursor-pointer text-black`
      } p-3 w-[50%] lg:w-auto rounded-lg font-semibold cursor-not-allowed`}
      disabled={isButtonDisabled}
    >
      {text}
    </button>
  );
}

export default Button;
