import { useState } from "react";
import enLocale from "assets/locales/en.json";
import faLocale from "assets/locales/fa.json";
import { useSelector } from "react-redux";
import utcChanger from "src/utils/utcToTehran";

function Card({ children, incident }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const darkMode = useSelector((state) => state.theme.darkMode);
  const language = useSelector((state) => state.language.language);
  console.log(incident);

  return (
    <div
      onClick={toggleDetails}
      className={`shadow-md rounded-lg p-3 mb-2 cursor-pointer transition-all duration-700 ease-in-out overflow-hidden ${
        darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
      } ${language === "fa" && "rtl"}`}
      style={{ maxHeight: isOpen ? "500px" : "110px" }}
    >
      <div className="flex flex-wrap justify-between">
        <h3 className="text-[15px] font-semibold">
          {incident.notification.text}
        </h3>
        <h3 className="text-[15px] font-semibold">
          {utcChanger(incident.notification.alert_create_time)}
        </h3>
      </div>
      <div className="mt-1 font-semibold text-[14px] text-gray-400">
        <h3>{incident.notification.service}</h3>
      </div>
      <div
        className={`${
          isOpen ? "opacity-100" : "opacity-0"
        } transition-opacity duration-700 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
}

export default Card;
