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
    <div className="flex flex-col h-full justify-between p-4">
      {incidents.length > 0 ? (
        <>
          {incidents.map((incident) => (
            <Card key={incident.id} incident={incident}>
              <div className="flex flex-col sm:flex-row gap-4 items-center mt-5">
                {/* Notification Type Dropdown */}
                <div className="mb-4">
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
                    className="p-2 border rounded-lg"
                  >
                    <option value="">Select Notification Type</option>
                    <option value="alert">Alert</option>
                    <option value="incident">Incident</option>
                  </select>
                </div>

                {notificationType && (
                  <>
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      <label className="block mb-2 font-semibold">
                        Priority:
                      </label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-2 border rounded-lg"
                      >
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    {notificationType === "incident" && (
                      <div className="flex flex-col gap-2 w-full sm:w-auto">
                        <label className="block mb-2 font-semibold">
                          Assigned To:
                        </label>
                        <select
                          value={assignedTeam}
                          onChange={(e) => setAssignedTeam(e.target.value)}
                          className="p-2 border rounded-lg"
                        >
                          <option value="">Select Assigned Team</option>
                          <option value="team1">Team 1</option>
                          <option value="team2">Team 2</option>
                          <option value="team3">Team 3</option>
                        </select>
                      </div>
                    )}
                  </>
                )}
                <div className="flex flex-col sm:flex-row gap-5 mt-5 items-center">
                  {notificationType === "alert" && (
                    <button
                      className="bg-yellow-500 p-2 w-full sm:w-auto rounded-lg text-white font-semibold"
                      disabled={isButtonDisabled}
                    >
                      Create Alert
                    </button>
                  )}
                  {notificationType === "incident" && (
                    <button
                      className="bg-green-500 p-2 w-full sm:w-auto rounded-lg text-white font-semibold"
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
          <h1 className="text-3xl text-center">No incidents found.</h1>
        </div>
      )}
    </div>
  );
}

export default Alerts;
