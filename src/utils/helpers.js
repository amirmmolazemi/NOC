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

export const menuItems = (language) => {
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
      click: () => Cookies.remove("token"),
      roles: ["Admin", "Member", "Head", "Team_724"],
    },
  ];
};

export const editValidateFields = (userData, setErrors) => {
  const newErrors = {};
  if (userData.password && userData.password.length < 8)
    newErrors.password = "Password must be at least 8 characters.";
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email))
    newErrors.email = "Invalid email address.";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const addValidateFields = (formData, setErrors) => {
  const newErrors = {};
  if (formData.password.length < 8)
    newErrors.password = "Password must be at least 8 characters.";
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
    newErrors.email = "Invalid email address.";
  if (!formData.username) newErrors.username = "Username is required.";
  if (!formData.role) newErrors.role = "Role is required.";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const editTeamValidateFields = (editTeamData, setErrors) => {
  const newErrors = {};
  if (!editTeamData.name) newErrors.name = "Name is required.";
  if (!editTeamData.headId) newErrors.headId = "Head is required.";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const addTeamValidateFields = (formData, setErrors) => {
  const newErrors = {};
  if (!formData.name) newErrors.name = "Name is required.";
  if (!formData.headId) newErrors.headId = "Head is required.";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const LoginValidateInputs = (inputs, setErrors) => {
  const newErrors = {};
  if (!inputs.username) newErrors.username = "Username is required";
  if (!inputs.password) newErrors.password = "Password is required";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const openEditModal = (setData, setShowModal, setId, user) => {
  setId(user.id);
  setData({
    username: user.username,
    password: "",
    email: user.email,
    role: user.id !== user?.team?.[0]?.head?.id && user.role.name,
  });
  setShowModal(true);
};

export const openTeamEditModal = (
  team,
  setId,
  setData,
  setPrevData,
  setShowModal
) => {
  setId(team.id);
  setData({ name: team.name, headId: team.head.id });
  setPrevData({ name: team.name, headId: team.head.id });
  setShowModal(true);
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-500";
    case "Medium":
      return "bg-yellow-500";
    case "Low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};
