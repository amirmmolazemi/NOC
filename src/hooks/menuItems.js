import Cookies from "js-cookie";
import { FiHome, FiSettings, FiUpload, FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import enLocale from "assets/locales/en.json";
import faLocale from "assets/locales/fa.json";

const useMenuItems = () => {
  const language = useSelector((state) => state.language.language);
  const locale = language === "en" ? enLocale : faLocale;
  const userRole = useSelector((state) => state.user.role);
  console.log(userRole);

  const menuItems = [
    {
      title: locale.menuItems.dashboard,
      icon: FiHome,
      link: "/",
      roles: ["Admin", "Member", "Head", "Team_724"],
    },
    {
      title: locale.menuItems.packs,
      icon: FiUpload,
      link: "/packs",
      roles: ["Team_724"],
    },
    {
      title: locale.menuItems.alerts,
      icon: FiHome,
      link: "/alerts",
      roles: ["Team_724"],
    },
    {
      title: locale.menuItems.incidents,
      icon: FiHome,
      link: "/incidents",
      roles: ["Head", "Member", "Team_724"],
    },
    {
      title: locale.menuItems.settings,
      icon: FiSettings,
      link: "/settings",
      roles: ["Admin", "Member", "Head", "Team_724"],
    },
    {
      title: locale.menuItems.logout,
      icon: FiLogOut,
      link: "/login",
      click: () => {
        Cookies.remove("token");
      },
      roles: ["Admin", "Member", "Head", "Team_724"],
    },
  ];

  return menuItems.filter((item) => item.roles.includes(userRole));
};

export default useMenuItems;
