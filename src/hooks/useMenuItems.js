import { useSelector } from "react-redux";
import menuItems from "helpers/menuItems";

const useMenuItems = () => {
  const language = useSelector((state) => state.language.language);
  const userRole = useSelector((state) => state.user.role);
  return menuItems(language).filter((item) => item.roles.includes(userRole));
};

export default useMenuItems;
