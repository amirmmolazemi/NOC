import { Route, Routes } from "react-router-dom";
import Login from "pages/Login.jsx";
import Dashboard from "pages/Dashboard.jsx";
import Settings from "pages/Settings.jsx";
import Layout from "src/Layout/Layout";
import { useState } from "react";

function Router() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout setDarkMode={setDarkMode} darkMode={darkMode}>
            <Dashboard darkMode={darkMode} />
          </Layout>
        }
      />
      <Route path="/login" element={<Login darkMode={darkMode} />} />
      <Route
        path="/dashboard"
        element={
          <Layout setDarkMode={setDarkMode} darkMode={darkMode}>
            <Dashboard darkMode={darkMode} />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout setDarkMode={setDarkMode} darkMode={darkMode}>
            <Settings darkMode={darkMode} />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout setDarkMode={setDarkMode} darkMode={darkMode}>
            <Dashboard darkMode={darkMode} />
          </Layout>
        }
      />
    </Routes>
  );
}

export default Router;
