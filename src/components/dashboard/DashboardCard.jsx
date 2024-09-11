function DashboardCard({ activeTorrents, darkMode, chart }) {
  return (
    <div
      className={`shadow-md rounded-lg
        ${darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"}
        w-full min-h-[200px] md:min-h-[333px] flex flex-col items-center justify-center overflow-hidden`}
    >
      <h3 className="text-center text-lg md:text-xl mb-4 lg:text-3xl font-semibold">
        {activeTorrents}
      </h3>

      <div className="flex-grow flex items-center justify-center w-full max-h-[250px]">
        {chart}
      </div>
    </div>
  );
}

export default DashboardCard;
