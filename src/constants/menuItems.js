import Cookies from "js-cookie";
import { FiHome, FiSettings, FiUpload, FiLogOut } from "react-icons/fi";
const menuItems = [
  { titleEn: "Dashboard", titleFa: "داشبورد", icon: FiHome, link: "/" },
  { titleEn: "Packs", titleFa: "پک ها", icon: FiUpload, link: "/packs" },
  {
    titleEn: "Settings",
    titleFa: "تنظیمات",
    icon: FiSettings,
    link: "/settings",
  },
  {
    titleEn: "Logout",
    titleFa: "خروج",
    icon: FiLogOut,
    link: "/login",
    click: () => {
      Cookies.remove("token");
    },
  },
];

export default menuItems;
