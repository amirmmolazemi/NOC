import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "components/loader/Loader";
import useCheckCookie from "hooks/useCheckCookie";
import enLocale from "assets/locales/en.json";
import faLocale from "assets/locales/fa.json";

const NotFound = () => {
  // const { loading } = useCheckCookie();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const language = useSelector((state) => state.language.language);
  const { notFound } = language === "en" ? enLocale : faLocale;

  // if (loading) return <Loader />;

  return (
    <div
      className={`flex flex-col justify-center items-center h-[calc(100vh-7vh)] ${
        darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <h1
        className={`text-6xl md:text-8xl font-bold mb-4 ${
          darkMode ? "text-accent-light" : "text-accent"
        }`}
      >
        {notFound.title}
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        {notFound.subtitle}
      </h2>
      <p className="text-lg md:text-xl mb-8 font-semibold">
        {notFound.message}
      </p>
      <Link to="/">
        <button
          className={`font-semibold px-6 py-3 rounded-lg ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-700 text-white"
          }`}
        >
          {notFound.buttonText}
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
