import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login from "pages/Login.jsx";
import Dashboard from "pages/Dashboard.jsx";
import Settings from "pages/Settings.jsx";
import Layout from "layout/Layout";
import { toggleDarkMode } from "Redux/slices/darkmodeSlice";

function Router() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            setDarkMode={() => dispatch(toggleDarkMode())}
            darkMode={darkMode}
          >
            <Dashboard darkMode={darkMode} />
          </Layout>
        }
      />
      <Route path="/login" element={<Login darkMode={darkMode} />} />
      <Route
        path="/dashboard"
        element={
          <Layout
            setDarkMode={() => dispatch(toggleDarkMode())}
            darkMode={darkMode}
          >
            <Dashboard darkMode={darkMode} />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout
            setDarkMode={() => dispatch(toggleDarkMode())}
            darkMode={darkMode}
          >
            <Settings />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout
            setDarkMode={() => dispatch(toggleDarkMode())}
            darkMode={darkMode}
          >
            <Dashboard />
          </Layout>
        }
      />
    </Routes>
  );
}

export default Router;
