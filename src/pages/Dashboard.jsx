import { useSelector } from "react-redux";
import useCheckCookie from "hooks/useCheckCookie";
import useRegisterChart from "hooks/useRegisterChart";
import Loader from "components/loader/Loader";
import enLocale from "assets/locales/en.json";
import faLocale from "assets/locales/fa.json";
import Team724Charts from "src/components/dashboard/Team724Charts";
function Dashboard() {
  useRegisterChart();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const language = useSelector((state) => state.language.language);
  const { opens, topTeams, receive } = language === "en" ? enLocale : faLocale;
  const { loading } = useCheckCookie();
  if (loading) return <Loader />;

  return (
    <>
      <Team724Charts
        opens={opens}
        topTeamsText={topTeams}
        receive={receive}
        darkMode={darkMode}
        language={language}
      />
    </>
  );
}

export default Dashboard;
