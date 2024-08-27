import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/loader/Loader";
import useCheckCookie from "hooks/useCheckCookie";
import { setRole } from "Redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import enLocale from "assets/locales/en.json";
import faLocale from "assets/locales/fa.json";

function Packs() {
  const { data, loading } = useCheckCookie();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const language = useSelector((state) => state.language.language);
  const locale = language === "en" ? enLocale : faLocale;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data && data.user && data.user.role && data.user.role.name) {
      dispatch(setRole(data.user.role.name));
      data.user.role.name !== "Team_724" && navigate("/dashboard");
    }
  }, [data, dispatch]);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  if (loading) return <Loader />;
  return (
    <div>
      <div
        onClick={toggleDetails}
        className={`shadow-md rounded-lg p-6 mt-6 cursor-pointer transition-all duration-700 ease-in-out overflow-hidden ${
          darkMode ? "text-white bg-gray-700" : "bg-white text-gray-700"
        } ${language === "fa" && "rtl"}`}
        style={{ maxHeight: isOpen ? "500px" : "150px" }} // تنظیم max-height برای انیمیشن
      >
        <h3 className="text-lg font-semibold mb-2">{locale.activeTorrents}</h3>
        <div
          className={`${
            isOpen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-700 ease-in-out`}
        >
          {/* content */}
        </div>
      </div>
    </div>
  );
}

export default Packs;
