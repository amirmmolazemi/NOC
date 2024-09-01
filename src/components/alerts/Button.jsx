function Button({ isButtonDisabled, text }) {
  return (
    <button
      className={`${
        isButtonDisabled
          ? "bg-red-500 text-white cursor-pointer"
          : "bg-red-200 text-gray-400"
      } p-3 w-[50%] lg:w-auto rounded-lg font-semibold cursor-not-allowed`}
      disabled={isButtonDisabled}
    >
      {text}
    </button>
  );
}

export default Button;
