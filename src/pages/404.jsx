import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "components/loader/Loader";
import useCheckCookie from "hooks/useCheckCookie";
import enLocale from "assets/locales/en.json";
import faLocale from "assets/locales/fa.json";

const NotFound = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const language = useSelector((state) => state.language.language);
  const locale = language === "en" ? enLocale : faLocale;

  const { loading } = useCheckCookie();
  if (loading) return <Loader />;

  return (
    <div
      className={`container mx-auto mt-[150px] flex justify-center px-4 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-200 text-gray-800"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <h1
          className={`text-6xl md:text-8xl font-bold mb-4 ${
            darkMode ? "text-accent-light" : "text-accent"
          }`}
        >
          {locale.notFound["title"]}
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          {locale.notFound["subtitle"]}
        </h2>
        <p className="text-lg md:text-xl mb-8 font-semibold">
          {locale.notFound["message"]}
        </p>
        <Link to="/">
          <button
            className={`font-semibold px-6 py-3 rounded-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-700 text-white"
            }`}
          >
            {locale.notFound["buttonText"]}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
