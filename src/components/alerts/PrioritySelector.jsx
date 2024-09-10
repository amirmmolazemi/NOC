import { toast } from "react-toastify";
import Cookies from "js-cookie";
import api from "services/api";

const PrioritySelector = ({ darkMode, incident, setPriority, priority }) => {
  const changeHandler = async (e) => {
    const { value } = e.target;
    const token = Cookies.get("token");
    setPriority(value);
    try {
      if (!value) return;
      await api.post(
        "/pack/priority",
        { id: incident.id, priority: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Priority saved successfully", { autoClose: 1500 });
    } catch (error) {
      toast.error("Failed to save priority");
    }
  };

  return (
    <div className="flex flex-col">
      <label
        className={`block mb-2 font-semibold ${darkMode ? "text-white" : ""}`}
      >
        Priority:
      </label>
      <select
        value={priority}
        onChange={changeHandler}
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
