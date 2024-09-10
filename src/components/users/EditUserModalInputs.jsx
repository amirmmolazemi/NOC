const roles = ["Head", "Team_724", "Member"];

function EditUserModalInputs(props) {
  const { userData, setUserData, darkMode, isHead, errors } = props;
  return ["username", "password", "email", "role"].map((field) => (
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
            darkMode ? "bg-gray-700 text-white" : "bg-white text-black border"
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
            darkMode ? "bg-gray-700 text-white" : "bg-white text-black border"
          } ${errors[field] && "border-red-500"}`}
        />
      )}
      {errors[field] && (
        <p className="text-red-500 text-sm font-semibold mt-1">
          {errors[field]}
        </p>
      )}
    </div>
  ));
}

export default EditUserModalInputs;
