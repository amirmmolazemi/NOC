import { useState } from "react";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import partLogo from "../assets/partLogo.png";
import menuItems from "src/constants/menuItems";

function Layout({ children, darkMode, setDarkMode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <aside
        className={`fixed top-0 left-0 z-30 w-64 p-6 flex flex-col items-center ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"
        } transition-transform duration-300 md:w-[5vw] ${
          isSidebarOpen ? "transform-none" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex`}
      >
        <div className="mb-6">
          <img src={partLogo} alt="Logo" className="w-[45px] h-auto mb-12" />
        </div>
        <nav className="flex-1 mt-12">
          <ul className="space-y-12">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="flex flex-col cursor-pointer justify-center text-center items-center text-2xl"
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
        <div className="flex flex-col justify-center items-center gap-5">
          <button
            onClick={() => setDarkMode((theme) => !theme)}
            className="text-2xl mb-1"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </aside>
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 fixed top-0 left-0 w-full z-20">
        <img src={partLogo} alt="Logo" className="w-[45px] h-auto" />
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode((theme) => !theme)}
            className="text-2xl"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-3xl"
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 z-30 w-64 p-6 flex flex-col items-center ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-800"
        } transition-transform duration-300 md:hidden ${
          isSidebarOpen ? "transform-none" : "-translate-x-full"
        }`}
      >
        <div className="mb-6">
          <img src={partLogo} alt="Logo" className="w-[45px] h-auto mb-12" />
        </div>
        <nav className="flex-1 mt-12">
          <ul className="space-y-12">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="flex flex-col cursor-pointer justify-center text-center items-center text-2xl"
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
      </div>
      <main
        className={`flex-1 p-8 ${
          darkMode ? "bg-gray-900" : "bg-gray-200"
        } h-[90vh] mt-[75px] rounded-[25px]`}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
