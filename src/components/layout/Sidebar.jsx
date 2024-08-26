// src/components/Sidebar.jsx
import { FiX } from "react-icons/fi";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";

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
        <NavMenu />
        <ThemeToggle />
      </aside>

      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside
            className={`fixed inset-0 z-30 p-6 flex flex-col items-center ${
              darkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-gray-100 text-gray-800"
            } transition-transform duration-300 md:hidden ${
              isSidebarOpen ? "transform-none" : "-translate-x-full"
            }`}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="self-end text-3xl mb-4"
            >
              <FiX />
            </button>
            <NavMenu onClick={() => setIsSidebarOpen(false)} />
          </aside>
        </>
      )}
    </>
  );
}

export default Sidebar;
