const AssignedTeamSelector = ({ darkMode, assignedTeam, setAssignedTeam }) => (
  <div className="flex flex-col">
    <label className="block mb-2 font-semibold">Assigned To:</label>
    <select
      value={assignedTeam}
      onChange={(e) => setAssignedTeam(e.target.value)}
      className={`p-3 border rounded-lg w-full cursor-pointer ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
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
