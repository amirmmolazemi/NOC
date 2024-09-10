import { useEffect, useState } from "react";
import AssignedTeamSelector from "./AssignedTeamSelector";
import NotificationDetails from "./NotificationDetails";
import Pagination from "../pagination/Pagination";

function Modal({
  setShowModal,
  showModal,
  incidentDetails,
  darkMode,
  createIncident,
  page,
  setPage,
  totalPages,
}) {
  const [assignedTeam, setAssignedTeam] = useState("");
  const [selectedNotification, setSelectedNotification] = useState([]);

  const isCreateButtonDisabled = () => {
    return !assignedTeam || selectedNotification.length === 0;
  };

  useEffect(() => {
    if (incidentDetails) {
      setPage(1);
    }
  }, [incidentDetails]);

  const saveHandler = async () => {
    const packId = incidentDetails.notifications[0].pack_id;
    const teamId = parseInt(assignedTeam, 10);
    createIncident(teamId, packId, selectedNotification);
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[85%] my-auto mx-auto max-w-4xl">
              <div
                className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "text-black bg-white border-gray-100"
                } outline-none focus:outline-none`}
              >
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create Incident</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <AssignedTeamSelector
                    darkMode={darkMode}
                    assignedTeam={assignedTeam}
                    setAssignedTeam={setAssignedTeam}
                  />
                  <div className="overflow-y-auto h-[280px] scrollbar-thin scrollbar-thumb-gray-500 mt-7 scrollbar-track-gray-200">
                    <NotificationDetails
                      darkMode={darkMode}
                      incidentDetails={incidentDetails}
                      selectedNotifications={selectedNotification}
                      setSelectedNotification={setSelectedNotification}
                      showModal={showModal}
                    />
                    {totalPages > 1 && incidentDetails && (
                      <Pagination
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className={`bg-emerald-500 text-white active:bg-emerald-600 disabled:cursor-not-allowed font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${
                      isCreateButtonDisabled()
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={saveHandler}
                    disabled={isCreateButtonDisabled()}
                  >
                    Create Incident
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export default Modal;
