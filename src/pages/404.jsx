import { useSelector } from "react-redux";
import Loader from "components/loader/Loader";
import useCheckCookie from "hooks/useCheckCookie";
import enLocale from "assets/locales/en.json";
import faLocale from "assets/locales/fa.json";
import Button from "components/404/Button";
import Title from "components/404/Title";
import Description from "components/404/Description";

const NotFound = () => {
  const { loading } = useCheckCookie();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const language = useSelector((state) => state.language.language);
  const { notFound } = language === "en" ? enLocale : faLocale;

  if (loading) return <Loader />;

  return (
    <div
      className={`flex flex-col justify-center items-center h-[calc(100vh-7vh)] ${
        darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <Title darkMode={darkMode} text={notFound.title} />
      <Description
        message={notFound.message}
        subtitle={notFound.subtitle}
        darkMode={darkMode}
      />
      <Button darkMode={darkMode} text={notFound.buttonText} />
    </div>
  );
};

export default NotFound;
