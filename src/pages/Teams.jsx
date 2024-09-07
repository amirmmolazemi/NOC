import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { mutate } from "swr";
import Cookies from "js-cookie";
import useUserRole from "hooks/useUserRole";
import Loader from "components/loader/Loader";
import TeamTable from "components/teams/TeamTable";
import Pagination from "components/pagination/Pagination";
import api from "configs/api";
import AddTeamModal from "src/components/teams/AddTeamModal";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { data, isLoading } = useUserRole(
    false,
    "Admin",
    `/team?size=10&page=${page}`
  );

  const addUserHandler = async (newTeam) => {
    try {
      const token = Cookies.get("token");
      await api.post("/team", newTeam, {
        headers: { Authorization: `Bearer ${token}` },
      });
      mutate(`/team?size=10&page=${page}`);
      toast.success("Team added successfully!");
    } catch (error) {
      toast.error("Error adding team");
    }
  };

  useEffect(() => {
    if (data?.otherData && !showModal) {
      const { teams, page, totalPages } = data.otherData;
      setTeams(teams || []);
      setPage(page || 1);
      setTotalPages(totalPages || 1);
    }
  }, [data, showModal]);

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1
        className={`text-3xl font-bold mb-12 text-center text-gray-${
          darkMode ? "200" : "800"
        }`}
      >
        Teams
      </h1>
      <button
        className="font-semibold px-4 py-2 rounded transition duration-200 bg-green-600 text-gray-100 hover:bg-green-500"
        onClick={() => setShowModal(true)}
      >
        Add Team
      </button>
      <TeamTable teams={teams} darkMode={darkMode} page={page} />
      {teams.length > 0 && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
      {showModal && (
        <AddTeamModal
          darkMode={darkMode}
          closeModal={() => setShowModal(false)}
          addUserHandler={addUserHandler}
        />
      )}
    </div>
  );
}

export default Teams;
