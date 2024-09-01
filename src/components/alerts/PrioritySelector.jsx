const PrioritySelector = ({ darkMode, priority, setPriority }) => (
  <div className="flex flex-col">
    <label
      className={`block mb-2 font-semibold ${
        darkMode ? "dark:text-white" : ""
      }`}
    >
      Priority:
    </label>
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className={`p-3 border rounded-lg w-full ${
        darkMode ? "dark:bg-gray-800 dark:border-gray-700 dark:text-white" : ""
      }`}
    >
      <option value="">Select Priority</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>
);

export default PrioritySelector;
