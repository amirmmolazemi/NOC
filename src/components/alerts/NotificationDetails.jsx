import utcChanger from "utils/utcToTehran";

const NotificationDetails = ({
  darkMode,
  incidentDetails,
  selectedNotifications = [],
  setSelectedNotification,
  showModal,
}) => {
  const selectHandler = (notificationId) => {
    setSelectedNotification((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  return (
    <>
      {incidentDetails?.notifications?.map((item) => (
        <div
          key={item.id}
          className={`p-4 border rounded-md shadow-sm mb-2 mt-4 ${
            darkMode
              ? "bg-gray-800 border-gray-500"
              : "bg-white border-gray-300"
          }`}
        >
          <div className="flex justify-between">
            <p
              className={`font-semibold ${
                darkMode ? "text-gray-400" : "text-black"
              }`}
            >
              Service Address: {item.service_addr}
            </p>
          </div>
          <div className="flex justify-between">
            <p
              className={`font-semibold ${
                darkMode ? "text-gray-400" : "text-black"
              }`}
            >
              Receive Time: {utcChanger(item.receive_time)}
            </p>
            {showModal && (
              <button
                className={`font-semibold px-4 py-2 rounded transition duration-200 ${
                  selectedNotifications.includes(item.id)
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : "bg-green-600 text-white hover:bg-green-500"
                }`}
                onClick={() => selectHandler(item.id)}
              >
                {selectedNotifications.includes(item.id) ? "Remove" : "Select"}
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default NotificationDetails;
