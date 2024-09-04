import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bar, Line, Doughnut, Radar } from "react-chartjs-2";
import { setRole } from "Redux/slices/userSlice";
import useCheckCookie from "hooks/useCheckCookie";
import useRegisterChart from "hooks/useRegisterChart";
import Loader from "components/loader/Loader";
import DashboardCard from "components/dashboard/DashboardCard";
import getChartData from "helpers/getChartData";
import enLocale from "assets/locales/en.json";
import faLocale from "assets/locales/fa.json";

function Dashboard() {
  useRegisterChart();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const language = useSelector((state) => state.language.language);
  const locale = language === "en" ? enLocale : faLocale;
  const chartData = useMemo(
    () => getChartData(locale, darkMode),
    [locale, darkMode]
  );
  const { data, loading } = useCheckCookie();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.user && data.user.role && data.user.role.name) {
      dispatch(setRole(data.user.role.name));
    }
  }, [data, dispatch]);

  if (loading) return <Loader />;

  return (
    <section
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mx-8 my-8 ${
        language === "fa" && "rtl"
      }`}
    >
      <DashboardCard
        locale={locale}
        darkMode={darkMode}
        chart={<Bar data={chartData} />}
      />
      <DashboardCard
        locale={locale}
        darkMode={darkMode}
        chart={<Line data={chartData} />}
      />
      <DashboardCard
        locale={locale}
        darkMode={darkMode}
        chart={<Doughnut data={chartData} />}
      />
      <DashboardCard
        locale={locale}
        darkMode={darkMode}
        chart={<Radar data={chartData} />}
      />
    </section>
  );
}

export default Dashboard;
