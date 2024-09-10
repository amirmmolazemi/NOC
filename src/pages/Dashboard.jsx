import { useSelector } from "react-redux";
import { Bar, Line, Doughnut, Radar } from "react-chartjs-2";
import useCheckCookie from "hooks/useCheckCookie";
import useRegisterChart from "hooks/useRegisterChart";
import Loader from "components/loader/Loader";
import DashboardCard from "components/dashboard/DashboardCard";
import enLocale from "assets/locales/en.json";
import faLocale from "assets/locales/fa.json";
import { getChartData } from "utils/helpers";

function Dashboard() {
  useRegisterChart();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const language = useSelector((state) => state.language.language);
  const { activeTorrents } = language === "en" ? enLocale : faLocale;
  const chartData = getChartData(activeTorrents, darkMode);
  const { loading } = useCheckCookie();
  if (loading) return <Loader />;

  return (
    <section
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mx-3 my-3 ${
        language === "fa" && "rtl"
      }`}
    >
      <DashboardCard
        activeTorrents={activeTorrents}
        darkMode={darkMode}
        chart={<Bar data={chartData} />}
      />
      <DashboardCard
        activeTorrents={activeTorrents}
        darkMode={darkMode}
        chart={<Line data={chartData} />}
      />
      <DashboardCard
        activeTorrents={activeTorrents}
        darkMode={darkMode}
        chart={<Doughnut data={chartData} />}
      />
      <DashboardCard
        activeTorrents={activeTorrents}
        darkMode={darkMode}
        chart={<Radar data={chartData} />}
      />
    </section>
  );
}

export default Dashboard;
