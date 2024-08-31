import { useState, useEffect } from "react";
import Card from "components/alerts/Card";
import Loader from "components/loader/Loader";
import useUserRole from "hooks/useUserRole";
import Pagination from "components/alerts/Pagination";
import api from "configs/api";
import Button from "components/alerts/Button";
import Cookies from "js-cookie";
import utcChanger from "src/utils/utcToTehran";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const fetcher = (url, token) =>
  api
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      return null;
    });

function Alerts() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUserRole(
    false,
    "Team_724",
    `/notifications?page=${page}`
  );
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [incidents, setIncidents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [notificationType, setNotificationType] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTeam, setAssignedTeam] = useState("");
  const [openIncidentId, setOpenIncidentId] = useState(null);
  const [incidentDetails, setIncidentDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [notificationPriority, setNotificationPriority] = useState("");
  const [packNotificationType, setPackNotificationType] = useState("");

  const token = Cookies.get("token");

  useEffect(() => {
    if (data?.otherData) {
      setIncidents(data.otherData.packs || []);
      setPage(data.otherData.page || 1);
      setTotalPages(data.otherData.totalPages || 1);
    }
  }, [data]);

  useEffect(() => {
    if (openIncidentId) {
      setLoadingDetails(true);
      setIncidentDetails([]);
      fetcher(`/notifications/${openIncidentId}`, token)
        .then((data) => setIncidentDetails(data.notifications || []))
        .finally(() => setLoadingDetails(false));
    }
  }, [openIncidentId, token]);

  const handleCardClick = (incidentId) => {
    if (openIncidentId === incidentId) {
      setOpenIncidentId(null);
    } else {
      setOpenIncidentId(incidentId);
    }
  };

  const isButtonDisabled =
    notificationType === "alert" ? !priority : !(priority && assignedTeam);

  // const selectHandler = (item, type, priority) => {
  //   if (type && priority) {
  //     item.type = type;
  //     item.priority = priority;
  //     setSelectedNotifications((items) => [...items, item]);
  //     return;
  //   }
  //   toast.error("choose the priority and type");
  // };

  if (isLoading) return <Loader />;

  return (
    <div
      className={`flex flex-col h-full justify-between p-6 lg:p-8 ${
        darkMode ? "dark:bg-gray-900" : ""
      }`}
    >
      {incidents.length ? (
        <>
          {incidents.map((incident) => (
            <Card
              key={incident.id}
              incident={incident}
              isOpen={openIncidentId === incident.id}
              toggleOpen={() => handleCardClick(incident.id)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col">
                  <label
                    className={`block mb-2 font-semibold ${
                      darkMode ? "dark:text-white" : ""
                    }`}
                  >
                    Notification Type:
                  </label>
                  <select
                    value={notificationType}
                    onChange={(e) => {
                      setNotificationType(e.target.value);
                      setPriority("");
                      setAssignedTeam("");
                    }}
                    className={`p-3 border rounded-lg w-full ${
                      darkMode
                        ? "dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        : ""
                    }`}
                  >
                    <option value="">Select Notification Type</option>
                    <option value="alert">Alert</option>
                    <option value="incident">Incident</option>
                  </select>
                </div>

                {notificationType && (
                  <>
                    <div className="flex flex-col">
                      <label
                        className={`block mb-2 font-semibold ${
                          darkMode ? "dark:text-white" : ""
                        }`}
                      >
                        Priority:
                      </label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={`p-3 border rounded-lg w-full ${
                          darkMode
                            ? "dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            : ""
                        }`}
                      >
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    {notificationType === "incident" && (
                      <div className="flex flex-col">
                        <label
                          className={`block mb-2 font-semibold ${
                            darkMode ? "dark:text-white" : ""
                          }`}
                        >
                          Assigned To:
                        </label>
                        <select
                          value={assignedTeam}
                          onChange={(e) => setAssignedTeam(e.target.value)}
                          className={`p-3 border rounded-lg w-full ${
                            darkMode
                              ? "dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                              : ""
                          }`}
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
              </div>
              <div className="overflow-auto max-h-[400px] mt-4">
                {loadingDetails ? (
                  <p className={`${darkMode ? "dark:text-white" : ""}`}>
                    Loading...
                  </p>
                ) : (
                  incidentDetails.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 border  rounded-md shadow-sm mb-2 bg-white mt-4 ${
                        darkMode ? "dark:bg-gray-800 border-none" : ""
                      }`}
                      // onClick={() => selectHandler(item)}
                    >
                      <div className="flex justify-between">
                        <p
                          className={`text-black font-bold ${
                            darkMode ? "dark:text-white" : ""
                          }`}
                        >
                          Issue: {item.text}
                        </p>
                        <p
                          className={`text-gray-400 font-semibold ${
                            darkMode ? "dark:text-gray-400" : ""
                          }`}
                        >
                          Service Address: {item.service_addr}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p
                          className={`font-semibold text-gray-400 ${
                            darkMode ? "dark:text-gray-400" : ""
                          }`}
                        >
                          Receive Time: {utcChanger(item.receive_time)}
                        </p>
                      </div>
                      <div className="mt-4">
                        <label
                          className={`block mb-2 font-semibold ${
                            darkMode ? "dark:text-white" : ""
                          }`}
                        >
                          Set Priority:
                        </label>
                        <span
                          className={`bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ${
                            darkMode ? "dark:bg-red-900 dark:text-red-300" : ""
                          }`}
                          value="high"
                          onClick={(e) => console.log(e.target.value)}
                        >
                          High
                        </span>
                        <span
                          className={`bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ${
                            darkMode
                              ? "dark:bg-yellow-900 dark:text-yellow-300"
                              : ""
                          }`}
                          value="mid"
                          onClick={(e) => console.log(e.target.value)}
                        >
                          Mid
                        </span>
                        <span
                          className={`bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ${
                            darkMode
                              ? "dark:bg-green-900 dark:text-green-300"
                              : ""
                          }`}
                          value="low"
                          onClick={(e) => console.log(e.target.value)}
                        >
                          Low
                        </span>
                      </div>
                      <div className="mt-4">
                        <label
                          className={`block mb-2 font-semibold ${
                            darkMode ? "dark:text-white" : ""
                          }`}
                        >
                          Type:
                        </label>
                        <span
                          className={`bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ${
                            darkMode
                              ? "dark:bg-yellow-900 dark:text-yellow-300"
                              : ""
                          }`}
                        >
                          Incident
                        </span>
                        <span
                          className={`bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ${
                            darkMode
                              ? "dark:bg-green-900 dark:text-green-300"
                              : ""
                          }`}
                        >
                          Alert
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-center mt-6">
                {notificationType === "alert" && (
                  <Button
                    color="yellow"
                    isButtonDisabled={isButtonDisabled}
                    text="Create Alert"
                  />
                )}
                {notificationType === "incident" && (
                  <Button
                    color="yellow"
                    isButtonDisabled={isButtonDisabled}
                    text="Create Incident"
                  />
                )}
              </div>
            </Card>
          ))}
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      ) : (
        <div className="flex items-center justify-center">
          <p
            className={`text-2xl font-semibold ${
              darkMode ? "dark:text-white" : ""
            }`}
          >
            No incidents found.
          </p>
        </div>
      )}
    </div>
  );
}

export default Alerts;
