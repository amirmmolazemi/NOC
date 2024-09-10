import { useState } from "react";
import { editValidateFields } from "utils/helpers";
import EditUserModalInputs from "./EditUserModalInputs";

function EditUserModal({
  darkMode,
  userData,
  setUserData,
  closeModal,
  editHandler,
  isHead,
}) {
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    if (editValidateFields(userData, setErrors)) editHandler();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="relative z-50 w-[85%] max-w-4xl mx-auto my-auto">
        <div
          className={`relative flex flex-col w-full rounded-lg shadow-lg border-0 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-100 text-black"
          }`}
        >
          <div className="flex items-start justify-between p-5 rounded-t">
            <h3 className="text-3xl font-semibold">Edit User</h3>
          </div>
          <div className="relative flex-auto p-6">
            <EditUserModalInputs
              darkMode={darkMode}
              errors={errors}
              isHead={isHead}
              setUserData={setUserData}
              userData={userData}
            />
          </div>
          <div className="flex items-center justify-end p-6 rounded-b">
            <button
              className="px-6 py-2 mr-2 text-sm font-bold uppercase cursor-pointer text-red-500"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              className="px-6 py-3 text-sm font-bold uppercase cursor-pointer text-white bg-emerald-500 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
