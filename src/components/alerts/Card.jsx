import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import utcChanger from "utils/utcToTehran";
import fetcher from "utils/fetcher";
import Button from "./Button";
import PrioritySelector from "./PrioritySelector";
import NotificationDetails from "./NotificationDetails";

function Card({ incident, isOpen, onCardClick }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [priority, setPriority] = useState("");

  const {
    data: incidentDetails,
    error,
    isLoading,
  } = useSWR(isOpen ? `/notifications/${incident.id}` : null, fetcher, {
    revalidateOnFocus: true,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      className={`shadow-md rounded-lg p-3 mb-12 cursor-pointer transition-all duration-200 ease-in-out overflow-hidden ${
        darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
      }`}
      style={{ maxHeight: isOpen ? "930px" : "110px" }}
    >
      <div onClick={onCardClick}>
        <div className="flex flex-wrap justify-between">
          <h3 className="text-[15px] font-semibold">
            {incident.notifications[0].text}
          </h3>
          <h3 className="text-[15px] font-semibold">
            {utcChanger(incident.notifications[0].receive_time)}
          </h3>
        </div>
        <div className="mt-1 font-semibold text-[14px] text-gray-400">
          <h3>{incident.notifications[0].service}</h3>
        </div>
        <div className="font-semibold text-[14px] text-gray-400">
          <h3>{incident.fingerprint}</h3>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "opacity-100" : "opacity-0"
        } transition-opacity duration-100 ease-in-out`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <PrioritySelector
            darkMode={darkMode}
            priority={priority}
            setPriority={setPriority}
          />
          <div className="flex items-center mt-8 w-full">
            <Button
              color="green"
              isButtonDisabled={priority}
              text="Create Incident"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[400px] scrollbar-thin scrollbar-thumb-gray-500 mt-3 scrollbar-track-gray-200">
          {isLoading ? (
            <p className={`${darkMode ? "dark:text-white" : ""}`}>Loading...</p>
          ) : (
            <NotificationDetails
              darkMode={darkMode}
              incidentDetails={incidentDetails}
              utcChanger={utcChanger}
              fingerprint={incident.fingerprint}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
