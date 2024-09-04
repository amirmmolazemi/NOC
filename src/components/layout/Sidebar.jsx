import { useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <>
      <aside
        className={`fixed z-30 w-[90px] h-full p-6 flex flex-col justify-between items-center ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"
        } transition-transform duration-300 hidden md:flex`}
      >
        <Logo />
        <NavMenu onClick={() => setIsSidebarOpen(false)} />
        <div className="flex flex-col items-center mt-6">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </aside>
      <div
        className={`fixed z-10 transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-50 bg-black"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <aside
        className={`fixed z-30 w-[50%] sm:w-[60%] h-full p-6 flex flex-col justify-between items-center transform transition-transform duration-300 md:hidden ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"
        } ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="self-end text-3xl mb-4"
        >
          <FiX />
        </button>
        <NavMenu onClick={() => setIsSidebarOpen(false)} />
        <div className="flex flex-col justify-center items-center">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
