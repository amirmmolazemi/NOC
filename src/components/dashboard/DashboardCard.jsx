function DashboardCard({ activeTorrents, darkMode, chart }) {
  return (
    <div
      className={`shadow-md rounded-lg p-6 ${
        darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
      }`}
    >
      <h3 className="text-lg font-semibold mb-12">{activeTorrents}</h3>
      {chart}
    </div>
  );
}

export default DashboardCard;
