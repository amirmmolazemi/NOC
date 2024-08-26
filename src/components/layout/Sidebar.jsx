import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-30 w-[80px] h-full p-6 flex flex-col items-center ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"
        } transition-transform duration-300 hidden md:flex`}
      >
        <Logo />
        <NavMenu onClick={() => setIsSidebarOpen(false)} />
        <LanguageToggle />
        <ThemeToggle />
      </aside>
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside
            className={`fixed top-0 left-0 z-30 w-[45%] sm:w-[60%] h-full p-6 flex flex-col items-center ${
              darkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-gray-100 text-gray-800"
            } transition-transform duration-300 md:hidden ${
              isSidebarOpen ? "sidebar-open" : "sidebar-closed"
            }`}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="self-end text-3xl mb-4"
            >
              <FiX />
            </button>
            <NavMenu onClick={() => setIsSidebarOpen(false)} />
            <LanguageToggle />
          </aside>
        </>
      )}
    </>
  );
}

export default Sidebar;
