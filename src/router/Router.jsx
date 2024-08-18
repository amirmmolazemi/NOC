import { Route, Routes } from "react-router-dom";
import Login from "pages/Login.jsx";
import Dashboard from "pages/Dashboard.jsx";
import Settings from "pages/Settings.jsx";
import Incidents from "pages/Incidents.jsx";
import Alerts from "pages/Alerts.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/incidents" element={<Incidents />} />
      <Route path="/alerts/:alertId" element={<Login />} />
      <Route path="/incidents/:incidentId" element={<Login />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default Router;
