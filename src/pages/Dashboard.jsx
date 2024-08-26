import { useSelector } from "react-redux";
import Loader from "src/components/loader/Loader";
import useCheckCookie from "src/hooks/useCheckCookie";

function Dashboard() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const language = useSelector((state) => state.language.language);

  const { loading } = useCheckCookie();
  if (loading) return <Loader />;

  const getLocalizedText = () => {
    if (language === "en") {
      return {
        activeTorrents: "Active Torrents",
        downloads: "Downloads",
        uploads: "Uploads",
        seedRatio: "Seed Ratio",
      };
    } else {
      return {
        activeTorrents: "تورنت‌های فعال",
        downloads: "دانلودها",
        uploads: "آپلودها",
        seedRatio: "نسبت سیید",
      };
    }
  };

  const { activeTorrents, downloads, uploads, seedRatio } = getLocalizedText();

  return (
    <section
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ${
        language === "fa" ? "rtl" : ""
      }`}
    >
      <div
        className={`shadow-md rounded-lg p-6 ${
          darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
        }`}
      >
        <h3 className="text-lg font-semibold">{activeTorrents}</h3>
        <p className="text-2xl font-bold mt-2">15</p>
      </div>
      <div
        className={`shadow-md rounded-lg p-6 ${
          darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
        }`}
      >
        <h3 className="text-lg font-semibold">{activeTorrents}</h3>
        <p className="text-2xl font-bold mt-2">15</p>
      </div>
      <div
        className={`shadow-md rounded-lg p-6 ${
          darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
        }`}
      >
        <h3 className="text-lg font-semibold">{activeTorrents}</h3>
        <p className="text-2xl font-bold mt-2">15</p>
      </div>
      <div
        className={`shadow-md rounded-lg p-6 ${
          darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
        }`}
      >
        <h3 className="text-lg font-semibold">{activeTorrents}</h3>
        <p className="text-2xl font-bold mt-2">15</p>
      </div>
    </section>
  );
}

export default Dashboard;
