import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";

function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`md:hidden flex items-center justify-between p-4 fixed w-full z-1 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="text-3xl"
      >
        {isSidebarOpen ? <FiX /> : <FiMenu />}
      </button>
    </div>
  );
}

export default Header;
