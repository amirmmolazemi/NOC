const NotificationDetails = ({ darkMode, incidentDetails, utcChanger }) => (
  <>
    {incidentDetails?.notifications?.map((item) => (
      <div
        key={item.id}
        className={`p-4 border rounded-md shadow-sm mb-2 bg-white mt-4 ${
          darkMode ? "dark:bg-gray-800 border-none" : ""
        }`}
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
        {/* <div className="flex flex-col sm:flex-row justify-between mt-4">
          <div className="flex flex-col sm:flex-row">
            <label
              className={`block mr-2 font-semibold ${
                darkMode ? "dark:text-white" : ""
              }`}
            >
              Set Priority:
            </label>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              <span
                className={`bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded ${
                  darkMode ? "dark:bg-red-900 dark:text-red-300" : ""
                }`}
              >
                High
              </span>
              <span
                className={`bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded ${
                  darkMode ? "dark:bg-yellow-900 dark:text-yellow-300" : ""
                }`}
              >
                Mid
              </span>
              <span
                className={`bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded ${
                  darkMode ? "dark:bg-green-900 dark:text-green-300" : ""
                }`}
              >
                Low
              </span>
            </div>
          </div>
        </div> */}
      </div>
    ))}
  </>
);

export default NotificationDetails;
