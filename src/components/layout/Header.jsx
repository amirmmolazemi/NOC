import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";

function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`md:hidden flex items-center justify-between p-4 fixed top-0 left-0 w-full z-20 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="text-3xl"
      >
        {isSidebarOpen ? <FiX /> : <FiMenu />}
      </button>
      <ThemeToggle />
    </div>
  );
}

export default Header;
