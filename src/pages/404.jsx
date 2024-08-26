import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "src/components/loader/Loader";
import useCheckCookie from "src/hooks/useCheckCookie";

const NotFound = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const language = useSelector((state) => state.language.language);

  const { loading } = useCheckCookie();
  if (loading) return <Loader />;

  const getLocalizedText = () => {
    if (language === "en") {
      return {
        title: "404",
        subtitle: "Page Not Found",
        message: "The page you are looking for does not exist",
        buttonText: "Return to Homepage",
      };
    } else {
      return {
        title: "۴۰۴",
        subtitle: "صفحه یافت نشد",
        message: "صفحه‌ای که به دنبال آن هستید وجود ندارد",
        buttonText: "بازگشت به صفحه اصلی",
      };
    }
  };

  const { title, subtitle, message, buttonText } = getLocalizedText();

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
          {title}
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">{subtitle}</h2>
        <p className="text-lg md:text-xl mb-8 font-semibold">{message}</p>
        <Link to="/">
          <button
            className={`font-semibold px-6 py-3 rounded-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-700 text-white"
            }`}
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
