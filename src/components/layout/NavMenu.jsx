import { Link } from "react-router-dom";
import menuItems from "constants/menuItems";

function NavMenu({ onClick }) {
  return (
    <nav className="flex-1 mt-12">
      <ul className="space-y-12 mt-12 ml-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex flex-col cursor-pointer justify-center text-center items-center text-2xl"
            onClick={onClick}
          >
            <Link
              to={item.link}
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
