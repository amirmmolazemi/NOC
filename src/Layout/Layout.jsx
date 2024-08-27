import { useState } from "react";
import Sidebar from "components/layout/Sidebar";
import Header from "components/layout/Header";
import { useSelector } from "react-redux";

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
      <main
        className={`mt-[70px] flex-1 p-8 transition-all duration-300 ${
          darkMode ? "bg-gray-900" : "bg-gray-200"
        } xl:mt-7 sm:mt-7  mb-7 rounded-[25px] ${
          isSidebarOpen
            ? "ml-0 md:ml-[80px]"
            : "ml-4 md:ml-[calc(80px+1rem)] mr-4"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
