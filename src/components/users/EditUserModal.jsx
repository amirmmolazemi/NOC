import { useState } from "react";

function EditUserModal({
  darkMode,
  userData,
  setUserData,
  closeModal,
  saveHandler,
  isHead,
}) {
  const [errors, setErrors] = useState({});
  const roles = ["Head", "Team_724", "Member"];

  const validateFields = () => {
    const newErrors = {};
    if (userData.password && userData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email))
      newErrors.email = "Invalid email address.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateFields()) saveHandler();
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
            {["username", "password", "email", "role"].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block mb-1 text-sm font-medium capitalize">
                  {field}
                </label>
                {field === "role" ? (
                  <select
                    value={userData.role}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, role: e.target.value }))
                    }
                    className={`w-full p-2 rounded ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-black border"
                    } ${isHead ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={isHead}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field === "password" ? "password" : "text"}
                    value={userData[field]}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    className={`w-full p-2 rounded ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-black border"
                    } ${errors[field] && "border-red-500"}`}
                  />
                )}
                {errors[field] && (
                  <p className="text-red-500 text-sm font-semibold mt-1">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}
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
