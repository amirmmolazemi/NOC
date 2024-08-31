import { useState, useEffect } from "react";
import Card from "components/alerts/Card";
import Loader from "components/loader/Loader";
import useUserRole from "hooks/useUserRole";
import Pagination from "components/alerts/Pagination";

function Alerts() {
  const [page, setPage] = useState(1);
  const { data, loading } = useUserRole(
    false,
    "Team_724",
    `/notifications?page=${page}`
  );
  const [incidents, setIncidents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [notificationType, setNotificationType] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTeam, setAssignedTeam] = useState("");
  const [openIncidentId, setOpenIncidentId] = useState(null);

  useEffect(() => {
    if (data && data.otherData) {
      setIncidents(data.otherData.packs || []);
      setPage(data.otherData.page || 1);
      setTotalPages(data.otherData.totalPages || 1);
      console.log(data);
    }
  }, [data]);

  const isButtonDisabled =
    notificationType === "alert" ? !priority : !(priority && assignedTeam);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col h-full justify-between p-6 lg:p-8">
      {incidents.length > 0 ? (
        <>
          {incidents.map((incident) => (
            <Card
              key={incident.id}
              incident={incident}
              isOpen={openIncidentId === incident.id}
              toggleOpen={() =>
                setOpenIncidentId((prevId) =>
                  prevId === incident.id ? null : incident.id
                )
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start mt-8">
                <div className="mb-6 w-full lg:w-auto">
                  <label className="block mb-2 font-semibold">
                    Notification Type:
                  </label>
                  <select
                    value={notificationType}
                    onChange={(e) => {
                      setNotificationType(e.target.value);
                      setPriority("");
                      setAssignedTeam("");
                    }}
                    className="p-3 border rounded-lg w-full"
                  >
                    <option value="">Select Notification Type</option>
                    <option value="alert">Alert</option>
                    <option value="incident">Incident</option>
                  </select>
                </div>

                {notificationType && (
                  <>
                    <div className="flex flex-col gap-2 w-full lg:w-auto">
                      <label className="block font-semibold">Priority:</label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-3 border rounded-lg w-full"
                      >
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>

                      {notificationType === "incident" && (
                        <div className="flex flex-col gap-2 w-full lg:w-auto">
                          <label className="block font-semibold">
                            Assigned To:
                          </label>
                          <select
                            value={assignedTeam}
                            onChange={(e) => setAssignedTeam(e.target.value)}
                            className="p-3 border rounded-lg w-full"
                          >
                            <option value="">Select Assigned Team</option>
                            <option value="team1">Team 1</option>
                            <option value="team2">Team 2</option>
                            <option value="team3">Team 3</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </>
                )}
                <div className="flex gap-5 items-center">
                  {notificationType === "alert" && (
                    <button
                      className={`${
                        isButtonDisabled ? "bg-yellow-200" : "bg-yellow-500"
                      } p-3 w-[50%] lg:w-auto rounded-lg text-white font-semibold cursor-pointer`}
                      disabled={isButtonDisabled}
                    >
                      Create Alert
                    </button>
                  )}
                  {notificationType === "incident" && (
                    <button
                      className={`${
                        isButtonDisabled ? "bg-green-200" : "bg-green-500"
                      } p-3 w-[50%] lg:w-auto rounded-lg text-white font-semibold cursor-pointer`}
                      disabled={isButtonDisabled}
                    >
                      Create Incident
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-3xl lg:text-4xl text-center">
            No Alert found.
          </h1>
        </div>
      )}
    </div>
  );
}

export default Alerts;
