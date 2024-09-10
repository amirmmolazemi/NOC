import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useUserRole from "hooks/useUserRole";
import Loader from "components/loader/Loader";
import TeamTable from "components/teams/TeamTable";
import Pagination from "components/pagination/Pagination";
import AddTeamModal from "components/teams/AddTeamModal";

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

  useEffect(() => {
    if (data?.otherData && !showModal) {
      const { teams, page, totalPages } = data?.otherData;
      setTeams(teams);
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
      {totalPages > 1 && teams && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
      {showModal && (
        <AddTeamModal
          darkMode={darkMode}
          closeModal={() => setShowModal(false)}
          teamsPage={page}
        />
      )}
    </div>
  );
}

export default Teams;
