import Cookies from "js-cookie";
import {
  FiHome,
  FiSettings,
  FiBell,
  FiLogOut,
  FiAlertCircle,
  FiUser,
} from "react-icons/fi";
import { RiTeamLine } from "react-icons/ri";
import enLocale from "assets/locales/en.json";
import faLocale from "assets/locales/fa.json";

const menuItems = (language) => {
  const locales = language === "en" ? enLocale : faLocale;
  return [
    {
      title: locales.menu.dashboard,
      icon: FiHome,
      link: "/",
      roles: ["Admin", "Member", "Head", "Team_724"],
    },
    {
      title: locales.menu.user,
      icon: FiUser,
      link: "/users",
      roles: ["Admin"],
    },
    {
      title: locales.menu.team,
      icon: RiTeamLine,
      link: "/teams",
      roles: ["Admin"],
    },
    {
      title: locales.menu.alerts,
      icon: FiBell,
      link: "/alerts",
      roles: ["Team_724"],
    },
    {
      title: locales.menu.incidents,
      icon: FiAlertCircle,
      link: "/incidents",
      roles: ["Head", "Member", "Team_724"],
    },
    {
      title: locales.menu.settings,
      icon: FiSettings,
      link: "/settings",
      roles: ["Admin", "Member", "Head", "Team_724"],
    },
    {
      title: locales.menu.logout,
      icon: FiLogOut,
      link: "/login",
      click: () => {
        Cookies.remove("token");
      },
      roles: ["Admin", "Member", "Head", "Team_724"],
    },
  ];
};

export default menuItems;
