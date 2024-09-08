import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useUserRole from "hooks/useUserRole";
import Loader from "components/loader/Loader";
import Card from "components/alerts/Card";
import Pagination from "components/pagination/Pagination";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import api from "src/configs/api";
import { mutate } from "swr";

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
      const { packs, page, totalPages } = data.otherData;
      setIncidents(packs || []);
      setPage(page || 1);
      setTotalPages(totalPages || 1);
    }
  }, [data, showModal]);

  if (isLoading) return <Loader />;

  const handleCardClick = (id) => {
    setOpenIncidentId(id === openIncidentId ? null : id);
  };

  const createIncident = async (teamId, packId, notifications) => {
    setOpenIncidentId(null);
    try {
      const token = Cookies.get("token");
      await api.post(
        "/incident",
        { packId, teamId, notifications },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("incident created successfully");
      mutate(`/pack?size=10&page=${page}`);
    } catch (error) {
      console.log(error);
      toast.error("error in creating incident");
    }
  };

  return (
    <div
      className={`flex flex-col h-full justify-between p-5 overflow-y-auto scrollbar-none ${
        darkMode ? "dark:bg-gray-900" : ""
      }`}
    >
      {incidents.length ? (
        <div className="flex flex-col justify-between gap-[5px]">
          {incidents.map((incident) => (
            <Card
              key={incident.id}
              incident={incident}
              isOpen={incident.id === openIncidentId}
              onCardClick={() => handleCardClick(incident.id)}
              showModal={showModal}
              setShowModal={setShowModal}
              createIncident={createIncident}
            />
          ))}
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
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
