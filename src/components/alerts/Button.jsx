import Modal from "./Modal";

function Button({
  isButtonActive,
  showModal,
  setShowModal,
  darkMode,
  incidentDetails,
}) {
  const clickHandler = () => isButtonActive && setShowModal(true);

  return (
    <>
      <button
        className={`${
          isButtonActive
            ? "bg-red-500 text-white cursor-pointer"
            : "bg-red-200 text-gray-400 cursor-not-allowed"
        } p-3 w-[50%] lg:w-auto rounded-lg font-semibold`}
        disabled={!isButtonActive}
        onClick={clickHandler}
      >
        Create Incident
      </button>
      <Modal
        darkMode={darkMode}
        incidentDetails={incidentDetails}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

export default Button;
