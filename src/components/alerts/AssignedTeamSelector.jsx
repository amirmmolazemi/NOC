import { useEffect, useState } from "react";
import fetcher from "src/utils/fetcher";
import useSWR from "swr";

const AssignedTeamSelector = ({ darkMode, assignedTeam, setAssignedTeam }) => {
  const { data: fetchedTeams, isLoading } = useSWR(`/team?page=off`, fetcher);
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (fetchedTeams?.teams) {
      setTeams(fetchedTeams.teams);
    }
  }, [fetchedTeams]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <label className="block mb-2 font-semibold">Assigned To:</label>
      <input
        type="text"
        placeholder="Search Team"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`mb-2 border p-2 rounded transition duration-200 ${
          darkMode
            ? "bg-gray-800 text-gray-300 border-gray-700"
            : "bg-white text-gray-800 border-gray-300"
        }`}
      />
      <select
        value={assignedTeam}
        onChange={(e) => setAssignedTeam(e.target.value)}
        className={`p-3 border w-full cursor-pointer ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <option value="">Select Assigned Team</option>
        {isLoading ? (
          <option value="">Loading...</option>
        ) : filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No teams available
          </option>
        )}
      </select>
    </div>
  );
};

export default AssignedTeamSelector;
