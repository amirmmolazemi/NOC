import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import api from "configs/api";
import { mutate } from "swr";
import TeamActions from "./TeamActions";
import EditTeamModal from "./EditTeamModal";
import { FiEye } from "react-icons/fi";
import MemberModal from "./MemberModal";

function TeamTable({ teams, darkMode, page }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [prevEditTeamData, setPrevEditTeamData] = useState({});
  const [team, setTeam] = useState("");
  const [teamId, setTeamId] = useState("");
  const [editTeamData, setEditTeamData] = useState({ name: "", headId: "" });

  const deleteHandler = async (id) => {
    try {
      const token = Cookies.get("token");
      await api.delete(`/team/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      mutate(`/team?size=10&page=${page}`);
      toast.success("Team deleted successfully!");
    } catch (error) {
      toast.error("Error deleting Team");
    }
  };

  const openEditModal = (team) => {
    setSelectedTeamId(team.id);
    setEditTeamData({ name: team.name, headId: team.head.id });
    setPrevEditTeamData({ name: team.name, headId: team.head.id });
    setShowEditModal(true);
  };

  const editHandler = async () => {
    try {
      const token = Cookies.get("token");
      let data = {
        name: editTeamData.name,
      };
      if (prevEditTeamData.headId !== editTeamData.headId)
        data.headId = editTeamData.headId;
      await api.put(`/team/${selectedTeamId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      mutate(`/team?size=10&page=${page}`);
      toast.success("Team data saved successfully!");
      setShowEditModal(false);
    } catch (error) {
      toast.error("Error saving Team data");
    }
  };

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
          {teams.length ? (
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
                    deleteHandler={() => deleteHandler(team.id)}
                    editHandler={() => openEditModal(team)}
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
          saveHandler={editHandler}
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
