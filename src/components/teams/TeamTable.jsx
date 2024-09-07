import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import api from "configs/api";
import { mutate } from "swr";
import TeamActions from "./TeamActions";
import EditTeamModal from "./EditTeamModal";

function TeamTable({ teams, darkMode, page }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [editTeamData, setEditTeamData] = useState({ name: "", headId: "" });

  const deleteHandler = async (id) => {
    try {
      const token = Cookies.get("token");
      await api.delete(`/Team/${id}`, {
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
    setShowModal(true);
  };

  const editHandler = async () => {
    try {
      const token = Cookies.get("token");
      await api.put(`/team/${selectedTeamId}`, editTeamData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      mutate(`/team?size=10&page=${page}`);
      toast.success("Team data saved successfully!");
      setShowModal(false);
    } catch (error) {
      console.log(error);
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
                <td className="p-3 text-center"></td>
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
                Users not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && (
        <EditTeamModal
          darkMode={darkMode}
          editTeamData={editTeamData}
          setEditTeamData={setEditTeamData}
          closeModal={() => setShowModal(false)}
          saveHandler={editHandler}
        />
      )}
    </>
  );
}

export default TeamTable;
