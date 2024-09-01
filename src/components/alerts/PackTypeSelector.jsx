function PackTypeSelector({
  darkMode,
  notificationType,
  setNotificationType,
  setPriority,
  setAssignedTeam,
}) {
  return (
    <div className="flex flex-col">
      <label
        className={`block mb-2 font-semibold ${
          darkMode ? "dark:text-white" : ""
        }`}
      >
        Pack Type:
      </label>
      <select
        value={notificationType}
        onChange={(e) => {
          setNotificationType(e.target.value);
          setPriority("");
          setAssignedTeam("");
        }}
        className={`p-3 border rounded-lg w-full ${
          darkMode
            ? "dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            : ""
        }`}
      >
        <option value="">Select Pack Type</option>
        <option value="alert">Alert</option>
        <option value="incident">Incident</option>
      </select>
    </div>
  );
}

export default PackTypeSelector;
