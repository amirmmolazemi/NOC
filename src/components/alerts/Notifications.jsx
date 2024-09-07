import NotificationDetails from "./NotificationDetails";
import NotificationLabels from "./NotificationLabels";

function Notifications({ darkMode, incidentDetails }) {
  return (
    <>
      <NotificationDetails
        darkMode={darkMode}
        incidentDetails={incidentDetails}
      >
        <NotificationLabels darkMode={darkMode} />
      </NotificationDetails>
    </>
  );
}

export default Notifications;
