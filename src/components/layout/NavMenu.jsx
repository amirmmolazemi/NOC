import { Link } from "react-router-dom";
import useMenuItems from "hooks/menuItems";

function NavMenu({ onClick }) {
  const menuItems = useMenuItems();

  return (
    <nav className="flex-1 mt-5">
      <ul className="space-y-8 ml-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex flex-col cursor-pointer justify-center text-center items-center text-2xl font-semibold"
          >
            <Link
              to={item.link}
              onClick={item.click ? item.click : onClick}
              className="flex flex-col items-center text-center"
            >
              <item.icon />
              <span className="text-sm mt-2">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavMenu;
