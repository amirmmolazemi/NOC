import { changePackPriority } from "src/api";

const PrioritySelector = ({ darkMode, incident, setPriority, priority }) => {
  return (
    <div className="flex flex-col">
      <label
        className={`block mb-2 font-semibold ${darkMode ? "text-white" : ""}`}
      >
        Priority:
      </label>
      <select
        value={priority}
        onChange={(e) =>
          changePackPriority(e.target.value, setPriority, incident.id)
        }
        className={`p-3 border rounded-lg w-full ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200"
        }`}
      >
        <option value="">Select Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default PrioritySelector;
