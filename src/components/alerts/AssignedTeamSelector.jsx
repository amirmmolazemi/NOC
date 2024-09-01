const AssignedTeamSelector = ({ darkMode, assignedTeam, setAssignedTeam }) => (
  <div className="flex flex-col">
    <label
      className={`block mb-2 font-semibold ${
        darkMode ? "dark:text-white" : ""
      }`}
    >
      Assigned To:
    </label>
    <select
      value={assignedTeam}
      onChange={(e) => setAssignedTeam(e.target.value)}
      className={`p-3 border rounded-lg w-full ${
        darkMode ? "dark:bg-gray-800 dark:border-gray-700 dark:text-white" : ""
      }`}
    >
      <option value="">Select Assigned Team</option>
      <option value="team1">Team 1</option>
      <option value="team2">Team 2</option>
      <option value="team3">Team 3</option>
    </select>
  </div>
);

export default AssignedTeamSelector;
