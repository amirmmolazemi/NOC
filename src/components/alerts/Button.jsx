function Button({ isButtonActive, setShowModal }) {
  const clickHandler = () => isButtonActive && setShowModal(true);

  return (
    <>
      <button
        className={`${
          isButtonActive
            ? "bg-red-500 text-white cursor-pointer"
            : "bg-[#892828] text-gray-400 cursor-not-allowed"
        } p-3 w-[50%] lg:w-auto rounded-lg font-semibold`}
        disabled={!isButtonActive}
        onClick={clickHandler}
      >
        Create Incident
      </button>
    </>
  );
}

export default Button;
