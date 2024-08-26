import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import menuItems from "constants/menuItems";

function NavMenu({ onClick }) {
  const language = useSelector((state) => state.language.language);

  const getMenuItemTitle = (item) =>
    language === "en" ? item.titleEn : item.titleFa;

  return (
    <nav className="flex-1 mt-12">
      <ul className="space-y-12 mt-12 ml-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex flex-col cursor-pointer justify-center text-center items-center text-2xl font-semibold"
          >
            <Link
              to={item.link}
              onClick={item.click}
              className="flex flex-col items-center text-center"
            >
              <item.icon />
              <span className="text-sm mt-2">{getMenuItemTitle(item)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavMenu;
