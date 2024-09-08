import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import utcChanger from "utils/utcToTehran";
import fetcher from "utils/fetcher";
import NotificationDetails from "./NotificationDetails";
import Pagination from "../pagination/Pagination";
import AssignMemberModal from "./AssignMemberModal";

function Card({
  incident,
  isOpen,
  onCardClick,
  showModal,
  setShowModal,
  userRole,
  currentUser,
}) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [priority, setPriority] = useState(incident.priority || "");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const { data: incidentDetails, isLoading } = useSWR(
    isOpen && `/pack/${incident.id}?page=${page}&size=10`,
    fetcher,
    { refreshInterval: 10 * 1000, refreshWhenHidden: true }
  );

  useEffect(() => {
    if (incidentDetails) {
      setPage(incidentDetails.page || 1);
      setTotalPages(incidentDetails.totalPages || 1);
    }
  }, [incidentDetails]);

  const shouldShow =
    userRole === "Team_724" ||
    currentUser.username === incident.assigned_team?.head?.username;

  return (
    <div
      className={`shadow-md rounded-lg p-3 transition-all duration-200 ease-in-out overflow-hidden ${
        darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
      } ${isOpen ? "max-h-[706px]" : "sm:max-h-[120px] max-h-[98px]"}`}
    >
      {shouldShow && (
        <>
          <div onClick={onCardClick} className="cursor-pointer">
            <div className="flex flex-wrap justify-between">
              <h3 className="text-[15px] font-semibold">
                {incident.notifications[0]?.text}
              </h3>
              <h3 className="text-[15px] font-semibold">
                {utcChanger(incident.notifications[0]?.receive_time)}
              </h3>
            </div>
            <div className="mt-1 font-semibold text-[14px] text-gray-400">
              <h3>{incident.notifications[0]?.service}</h3>
            </div>
            <div className="flex justify-between mt-1 font-semibold text-[14px] text-gray-400">
              <h3>Fingerprint: {incident.fingerprint}</h3>
              <h3>Status: {incident.status}</h3>
            </div>
            <div className="flex justify-between mt-1 font-semibold text-[14px] text-gray-400">
              <h3>Assigned Team: {incident.assigned_team?.name}</h3>
              <h3>
                Master Member:
                <span className="text-red-500 font-bold">
                  {!incident.master_member
                    ? " Not Declare"
                    : incident.master_member.username}
                </span>
              </h3>
            </div>
          </div>

          <div
            className={`${
              isOpen ? "opacity-100" : "opacity-0"
            } transition-opacity duration-100 ease-in-out`}
          >
            {currentUser.role.name === "Head" && (
              <>
                <button
                  className="font-semibold px-4 py-2 mt-7 rounded transition duration-200 bg-green-600 text-gray-100 hover:bg-green-500"
                  onClick={() => setShowModal(true)}
                >
                  Assign to Member
                </button>
                {showModal && (
                  <AssignMemberModal
                    darkMode={darkMode}
                    closeModal={() => setShowModal(false)}
                    team={currentUser?.team?.name}
                  />
                )}
              </>
            )}
            {currentUser.role.name === "Member" && (
              <button className="font-semibold px-4 py-2 mt-7 rounded transition duration-200 bg-green-600 text-gray-100 hover:bg-green-500">
                Done
              </button>
            )}
            <div className="overflow-y-auto h-[400px] scrollbar-thin scrollbar-thumb-gray-500 mt-3 scrollbar-track-gray-200">
              {isLoading ? (
                <p className={`${darkMode ? "text-white" : "text-black"}`}>
                  Loading...
                </p>
              ) : (
                <>
                  <NotificationDetails
                    darkMode={darkMode}
                    incidentDetails={incidentDetails}
                  />
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                  />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
