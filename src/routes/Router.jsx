import { Route, Routes } from "react-router-dom";
import Layout from "layout/Layout";
import Login from "pages/Login.jsx";
import Dashboard from "pages/Dashboard.jsx";
import Settings from "pages/Settings.jsx";
import NotFound from "pages/404";
import Alerts from "pages/Alerts";
import Incidents from "pages/Incidents";
import Users from "pages/Users";
import Teams from "pages/Teams";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/settings", element: <Settings /> },
  { path: "/alerts", element: <Alerts /> },
  { path: "/incidents", element: <Incidents /> },
  { path: "/users", element: <Users /> },
  { path: "/teams", element: <Teams /> },
  { path: "*", element: <NotFound /> },
];

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<Layout>{route.element}</Layout>}
        />
      ))}
    </Routes>
  );
}

export default Router;
