import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login from "pages/Login.jsx";
import Dashboard from "pages/Dashboard.jsx";
import Settings from "pages/Settings.jsx";
import Layout from "layout/Layout";
import NotFound from "pages/404";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
}

export default Router;
