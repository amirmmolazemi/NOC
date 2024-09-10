import utcChanger from "utils/utcToTehran";

const NotificationDetails = ({ darkMode, incidentDetails }) => {
  return (
    <>
      {incidentDetails?.notifications?.map((item) => (
        <div
          key={item.id}
          className={`p-4 border rounded-md shadow-sm mb-2 mt-4 ${
            darkMode
              ? `bg-gray-800 ${item.type === "Incident" ? "border-red-500" : "border-gray-500"}`
              : "bg-white "
          }`}
        >
          {console.log(incidentDetails)}
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
          </div>
        </div>
      ))}
    </>
  );
};

export default NotificationDetails;
