import { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "components/layout/Sidebar";
import Header from "components/layout/Header";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <Sidebar
        darkMode={darkMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Header
        darkMode={darkMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`mt-[70px] flex-1 overflow-y-auto transition-all duration-300 mb-7 rounded-[25px] md:mt-7 mx-4 md:ml-[calc(80px+1rem)] scrollbar-none ${
          darkMode ? "bg-gray-900" : "bg-gray-200"
        }`}
      >
        <div className="sm:max-h-[93vh]">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
