function NotificationLabels({ darkMode }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between mt-4">
      <div className="flex flex-col sm:flex-row">
        <label
          className={`block mr-2 font-semibold ${darkMode && "text-white"}`}
        >
          Set Priority:
        </label>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <span
            className={`text-sm font-medium px-2.5 py-0.5 rounded ${
              darkMode
                ? "bg-gray-900 text-gray-300"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            High
          </span>
          <span
            className={`text-sm font-medium px-2.5 py-0.5 rounded ${
              darkMode
                ? "bg-gray-900 text-gray-300"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Mid
          </span>
          <span
            className={`text-sm font-medium px-2.5 py-0.5 rounded ${
              darkMode
                ? "bg-gray-900 :text-gray-300"
                : "bg-gray-100 text-gray-800 "
            }`}
          >
            Low
          </span>
        </div>
      </div>
    </div>
  );
}

export default NotificationLabels;
