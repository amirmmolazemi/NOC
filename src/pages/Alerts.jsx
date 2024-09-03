import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "components/loader/Loader";
import useUserRole from "hooks/useUserRole";
import Card from "components/alerts/Card";
import Pagination from "components/alerts/Pagination";

function Alerts() {
  const [page, setPage] = useState(1);
  const [openIncidentId, setOpenIncidentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [incidents, setIncidents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { data, isLoading } = useUserRole(
    false,
    "Team_724",
    `/pack?page=${page}`
  );

  useEffect(() => {
    if (data?.otherData && !openIncidentId && !showModal) {
      setIncidents(data.otherData.packs || []);
      setPage(data.otherData.page || 1);
      setTotalPages(data.otherData.totalPages || 1);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  const handleCardClick = (id) => {
    setOpenIncidentId(id === openIncidentId ? null : id);
  };

  return (
    <div
      className={`flex flex-col h-full justify-between p-6 overflow-y-auto scrollbar-none ${
        darkMode ? "dark:bg-gray-900" : ""
      }`}
    >
      {incidents.length ? (
        <div className="flex flex-col justify-between gap-[60px]">
          {incidents.map((incident) => (
            <Card
              key={incident.id}
              incident={incident}
              isOpen={incident.id === openIncidentId}
              onCardClick={() => handleCardClick(incident.id)}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          ))}
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p
            className={`text-2xl font-semibold ${
              !darkMode ? "text-black" : "text-white"
            }`}
          >
            No Alerts found.
          </p>
        </div>
      )}
    </div>
  );
}

export default Alerts;
