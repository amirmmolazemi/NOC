import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useUserRole from "hooks/useUserRole";
import Loader from "components/loader/Loader";
import Card from "components/alerts/Card";
import Pagination from "components/pagination/Pagination";

function Alerts() {
  const [incidents, setIncidents] = useState([]);
  const [openIncidentId, setOpenIncidentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { data, isLoading } = useUserRole(
    false,
    "Team_724",
    `/pack?size=10&page=${page}`
  );

  useEffect(() => {
    if (data?.otherData && !openIncidentId && !showModal) {
      const { packs, page, totalPages } = data?.otherData;
      setIncidents(packs);
      setPage(page || 1);
      setTotalPages(totalPages || 1);
    }
  }, [data, showModal]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col h-full justify-between p-5 overflow-y-auto scrollbar-none">
      {incidents ? (
        <div className="flex flex-col justify-between gap-[5px]">
          {incidents.map((incident) => (
            <Card
              key={incident.id}
              incident={incident}
              isOpen={incident.id === openIncidentId}
              onCardClick={() =>
                setOpenIncidentId(
                  incident.id === openIncidentId ? null : incident.id
                )
              }
              setOpenIncidentId={setOpenIncidentId}
              showModal={showModal}
              setShowModal={setShowModal}
              alertsPage={page}
            />
          ))}
          {totalPages > 1 && incidents && (
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              openIncidentId={openIncidentId}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[calc(93vh-8vh)]">
          <p
            className={`text-3xl font-semibold ${
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
