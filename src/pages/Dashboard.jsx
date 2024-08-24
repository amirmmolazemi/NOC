import useCheckCookie from "src/hooks/useCheckCookie";

function Dashboard({ darkMode }) {
  // const { data, loading } = useCheckCookie("");

  // if (loading) return <h1>Loading ....</h1>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div
        className={`bg-white shadow-md rounded-lg p-6 ${
          darkMode ? "text-white bg-gray-700" : ""
        }`}
      >
        <h3 className="text-lg font-semibold">Active Torrents</h3>
        <p className="text-2xl font-bold mt-2">15</p>
      </div>
      <div
        className={`bg-white shadow-md rounded-lg p-6 ${
          darkMode ? "text-white bg-gray-700" : ""
        }`}
      >
        <h3 className="text-lg font-semibold">Downloads</h3>
        <p className="text-2xl font-bold mt-2">120 GB</p>
      </div>
      <div
        className={`bg-white shadow-md rounded-lg p-6 ${
          darkMode ? "text-white bg-gray-700" : ""
        }`}
      >
        <h3 className="text-lg font-semibold">Uploads</h3>
        <p className="text-2xl font-bold mt-2">300 GB</p>
      </div>
      <div
        className={`bg-white shadow-md rounded-lg p-6 ${
          darkMode ? "text-white bg-gray-700" : ""
        }`}
      >
        <h3 className="text-lg font-semibold">Seed Ratio</h3>
        <p className="text-2xl font-bold mt-2">2.5</p>
      </div>
    </section>
  );
}

export default Dashboard;
