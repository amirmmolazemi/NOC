import { useState, useEffect } from "react";
import Card from "components/incidents/Card";
import Loader from "components/loader/Loader";
import useUserRole from "hooks/useUserRole";
import Pagination from "components/pagination/Pagination";
import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import fetcher from "utils/fetcher";
import api from "services/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function Incidents() {
  const [page, setPage] = useState(1);
  const { data: currentUser } = useSWR(`/user/me`, fetcher);
  const { data, isLoading, error } = useUserRole(
    true,
    "",
    `pack/incidents?size=6&page=${page}`
  );
  const [incidents, setIncidents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [openIncidentId, setOpenIncidentId] = useState(null);
  const [assignMemberShowModal, setAssignMemberShowModal] = useState(false);
  const [assignMasterShowModal, setAssignMasterShowModal] = useState(false);

  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (data?.otherData && !openIncidentId && !assignMemberShowModal) {
      const { incidents, page, totalPages } = data?.otherData;
      setIncidents(incidents);
      setPage(page || 1);
      setTotalPages(totalPages || 1);
    }
  }, [data, openIncidentId, assignMemberShowModal]);

  if (isLoading) return <Loader />;

  if (error) {
    toast.error("Error fetching incidents");
    return (
      <div className="flex flex-col h-full justify-between p-5 overflow-y-auto scrollbar-none">
        <div className="flex items-center justify-center h-[calc(93vh-8vh)]">
          <p
            className={`text-3xl font-semibold ${
              !darkMode ? "text-black" : "text-white"
            }`}
          >
            Error loading incidents. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const handleCardClick = (id) => {
    setOpenIncidentId(id === openIncidentId ? null : id);
  };

  const assignToMember = async (packId, masterMember, members) => {
    try {
      const token = Cookies.get("token");
      await api.post(
        "incident/assign",
        { packId, masterMember, members },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpenIncidentId(null);
      mutate(`pack/incidents?size=6&page=${page}`);
      toast.success("Pack Assigned successfully");
    } catch (error) {
      toast.error("Error assigning the incident");
    }
  };

  const doneHandler = async (incidentId) => {
    try {
      const token = Cookies.get("token");
      await api.post(
        `incident/resolve/${incidentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpenIncidentId(null);
      mutate(`pack/incidents?size=6&page=${page}`);
      toast.success("Pack Closed Successfully");
    } catch (error) {
      toast.error("Error Closing The Incident");
    }
  };

  return (
    <div className="flex flex-col h-full justify-between p-5 overflow-y-auto scrollbar-none">
      {incidents && !error ? (
        <div className="flex flex-col justify-between gap-[5px]">
          {incidents.map((incident) => (
            <Card
              key={incident.id}
              incident={incident}
              isOpen={incident.id === openIncidentId}
              onCardClick={() => handleCardClick(incident.id)}
              memberShowModal={assignMemberShowModal}
              setMemberShowModal={setAssignMemberShowModal}
              masterShowModal={assignMasterShowModal}
              setMasterShowModal={setAssignMasterShowModal}
              currentUser={currentUser}
              assignToMember={assignToMember}
              doneHandler={doneHandler}
            />
          ))}
          {totalPages > 1 && incidents.length > 0 && (
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
            No Incidents found.
          </p>
        </div>
      )}
    </div>
  );
}

export default Incidents;
