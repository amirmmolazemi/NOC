import { useState } from "react";
import { deleteTeamHandler } from "api/index";
import TeamActions from "./TeamActions";
import EditTeamModal from "./EditTeamModal";
import { FiEye } from "react-icons/fi";
import MemberModal from "./MemberModal";
import { openTeamEditModal } from "utils/helpers";

function TeamTable({ teams, darkMode, page }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [prevEditTeamData, setPrevEditTeamData] = useState({});
  const [team, setTeam] = useState("");
  const [teamId, setTeamId] = useState("");
  const [editTeamData, setEditTeamData] = useState({ name: "", headId: "" });

  return (
    <>
      <table
        className={`shadow-lg rounded-lg overflow-hidden min-w-full mt-6 mb-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <thead
          className={`border-b ${
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800"
          }`}
        >
          <tr>
            <th className="p-3 text-center">ID</th>
            <th className="p-3 text-center">Name</th>
            <th className="p-3 text-center">Head</th>
            <th className="p-3 text-center">members</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams ? (
            teams.map((team) => (
              <tr
                key={team.id}
                className={`font-semibold transition duration-200 hover:bg-opacity-80 ${
                  darkMode
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <td className="p-3 text-center">{team.id}</td>
                <td className="p-3 text-center">{team.name}</td>
                <td className="p-3 text-center">{team.head.username}</td>
                <td className="p-3 text-center">
                  <button
                    className="text-green-500 hover:text-green-700"
                    title="View Members"
                    onClick={() => {
                      setShowMembersModal(true);
                      setTeam(team.name);
                      setTeamId(team.id);
                    }}
                  >
                    <FiEye size={20} />
                  </button>
                </td>
                <td className="p-3 text-center flex justify-center items-center gap-4">
                  <TeamActions
                    deleteHandler={() => deleteTeamHandler(team.id, page)}
                    editHandler={() =>
                      openTeamEditModal(
                        team,
                        setSelectedTeamId,
                        setEditTeamData,
                        setPrevEditTeamData,
                        setShowEditModal
                      )
                    }
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className={`p-3 text-center ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Team not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showEditModal && (
        <EditTeamModal
          darkMode={darkMode}
          editTeamData={editTeamData}
          setEditTeamData={setEditTeamData}
          closeModal={() => setShowEditModal(false)}
          prevEditTeamData={prevEditTeamData}
          teamsPage={page}
          setShowEditModal={setShowEditModal}
          teamId={selectedTeamId}
        />
      )}
      {showMembersModal && (
        <MemberModal
          darkMode={darkMode}
          closeModal={() => setShowMembersModal(false)}
          team={team}
          teamId={teamId}
        />
      )}
    </>
  );
}

export default TeamTable;
