import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import utcChanger from "utils/utcToTehran";
import fetcher from "utils/fetcher";
import Button from "./Button";
import PrioritySelector from "./PrioritySelector";
import NotificationDetails from "./NotificationDetails";
import Modal from "./Modal";
import Pagination from "../pagination/Pagination";

function Card(props) {
  const {
    incident,
    isOpen,
    onCardClick,
    showModal,
    setShowModal,
    createIncident,
    isIncident,
  } = props;
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [priority, setPriority] = useState(incident.priority || "");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const {
    data: incidentDetails,
    isLoading,
    error,
  } = useSWR(
    isOpen ? `/pack/${incident.id}?page=${page}&size=10` : null,
    fetcher,
    {
      refreshInterval: 10 * 1000,
      refreshWhenHidden: true,
    }
  );

  useEffect(() => {
    if (incidentDetails) {
      setPage(incidentDetails.page || 1);
      setTotalPages(incidentDetails.totalPages || 1);
    }
  }, [incidentDetails]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="relative">
      <div
        className={`absolute h-full w-3 rounded ${getPriorityColor(priority)}`}
      ></div>

      <div
        className={`shadow-md rounded-lg p-3 transition-all duration-200 ease-in-out overflow-hidden ml-1 relative ${
          darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
        } ${isOpen ? "max-h-[735px]" : "sm:max-h-[70px] max-h-[98px]"}`}
      >
        <div onClick={onCardClick} className="cursor-pointer">
          <div className="flex flex-wrap justify-between">
            <h3 className="text-[15px] font-semibold">
              {incident.notifications[0]?.text || "No Notification Text"}
            </h3>
            <h3 className="text-[15px] font-semibold">
              {utcChanger(incident.notifications[0]?.receive_time || "")}
            </h3>
          </div>
          <div className="mt-1 font-semibold text-[14px] text-gray-400">
            <h3>{incident.notifications[0]?.service || "No Service Info"}</h3>
          </div>
        </div>
        <div
          className={`${
            isOpen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-100 ease-in-out`}
        >
          {!isIncident && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <PrioritySelector
                darkMode={darkMode}
                incident={incident}
                setPriority={setPriority}
                priority={priority}
              />
              <div className="flex items-center mt-8 w-full">
                <Button isButtonActive={priority} setShowModal={setShowModal} />
                <Modal
                  darkMode={darkMode}
                  incidentDetails={incidentDetails}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  createIncident={createIncident}
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
          )}
          <div className="overflow-y-auto h-[400px] scrollbar-thin scrollbar-thumb-gray-500 mt-3 scrollbar-track-gray-200">
            {isLoading ? (
              <p className={`${darkMode ? "text-white" : "text-black"}`}>
                Loading...
              </p>
            ) : error ? (
              <p className="text-red-500">
                Failed to load incident details. Please try again.
              </p>
            ) : incidentDetails ? (
              <>
                <NotificationDetails
                  darkMode={darkMode}
                  incidentDetails={incidentDetails}
                />
                {totalPages > 1 && (
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                  />
                )}
              </>
            ) : (
              <p className="text-gray-500">No details available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
