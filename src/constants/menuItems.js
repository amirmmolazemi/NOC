import Cookies from "js-cookie";
import { FiHome, FiSettings, FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

const menuItems = [
  { title: "Dashboard", icon: FiHome, link: "/" },
  { title: "Packs", icon: FiUpload, link: "/packs" },
  { title: "Settings", icon: FiSettings, link: "/settings" },
  {
    title: "Logout",
    icon: FiSettings,
    link: "/login",
    click: () => {
      Cookies.remove("token");
    },
  },
];

export default menuItems;
