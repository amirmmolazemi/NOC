import { useSelector } from "react-redux";
import utcChanger from "utils/utcToTehran";

function Card({ children, incident, isOpen, toggleOpen }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`shadow-md rounded-lg p-3 mb-2 cursor-pointer transition-all duration-200 ease-in-out overflow-hidden ${
        darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
      }`}
      style={{ maxHeight: isOpen ? "680px" : "110px" }}
    >
      <div onClick={toggleOpen} className="select-none">
        <div className="flex flex-wrap justify-between">
          <h3 className="text-[15px] font-semibold">
            {incident.notifications[0].text}
          </h3>
          <h3 className="text-[15px] font-semibold">
            {utcChanger(incident.notifications[0].receive_time)}
          </h3>
        </div>
        <div className="mt-1 font-semibold text-[14px] text-gray-400">
          <h3>{incident.notifications[0].service}</h3>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "opacity-100" : "opacity-0"
        } transition-opacity duration-100 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
}

export default Card;
