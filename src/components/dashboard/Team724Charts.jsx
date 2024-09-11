import { Bar, Doughnut, Line } from "react-chartjs-2";
import DashboardCard from "./DashboardCard";
import useSWR from "swr";
import fetcher from "src/utils/fetcher";
import { useEffect, useState } from "react";

function Team724Charts({ language, darkMode, opens, topTeamsText, receive }) {
  const { data: topTeams, error: topTeamsError } = useSWR(
    "/team/top-teams",
    fetcher,
    { revalidateOnReconnect: true }
  );

  const { data: openNotifications, error: openNotificationsError } = useSWR(
    "/notif/overview",
    fetcher,
    { revalidateOnReconnect: true }
  );

  const { data: allNotifications, error: allNotificationsError } = useSWR(
    "/notif/all-overview",
    fetcher,
    { revalidateOnReconnect: true }
  );

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [doughnutData, setDougnutData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topTeams && !topTeamsError) {
      const teams = topTeams.map((item) => item.team || "Unknown");
      const closedIncidents = topTeams.map((item) => item.closedIncidents || 0);
      const openIncidents = topTeams.map((item) => item.openIncidents || 0);

      setBarChartData({
        labels: teams,
        datasets: [
          {
            label: "Closed Incidents",
            data: closedIncidents,
            backgroundColor: darkMode
              ? "rgba(33,150,243,0.5)"
              : "rgba(33,150,243,0.8)",
          },
          {
            label: "Open Incidents",
            data: openIncidents,
            backgroundColor: darkMode
              ? "rgba(76,175,80,0.5)"
              : "rgba(76,175,80,0.8)",
          },
        ],
      });
    }
    if (
      openNotifications &&
      !openNotificationsError &&
      !allNotificationsError
    ) {
      const incidents = openNotifications.incidents;
      const alerts = openNotifications.alerts;

      setDougnutData({
        labels: ["Incidents", "Alerts"],
        datasets: [
          {
            data: [incidents, alerts],
            backgroundColor: [
              darkMode ? "#FF5722" : "#FF5722",
              darkMode ? "#03A9F4" : "#03A9F4",
            ],
          },
        ],
      });
    }
    if (allNotifications && !allNotificationsError) {
      const labels = [];
      const alertsData = [];
      const incidentsData = [];

      for (const [date, values] of Object.entries(allNotifications)) {
        labels.push(date);
        alertsData.push(values[0]);
        incidentsData.push(values[1]);
      }

      setLineChartData({
        labels: labels,
        datasets: [
          {
            label: "Alerts",
            data: alertsData,
            borderColor: darkMode ? "#4CAF50" : "#FFC107",
            backgroundColor: darkMode
              ? "rgba(76,175,80,0.2)"
              : "rgba(255,193,7,0.2)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Incidents",
            data: incidentsData,
            borderColor: darkMode ? "#FF5722" : "#03A9F4",
            backgroundColor: darkMode
              ? "rgba(255,87,34,0.2)"
              : "rgba(3,169,244,0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      });
    }

    if (topTeams && openNotifications && allNotifications) {
      setLoading(false);
    }
  }, [
    topTeams,
    openNotifications,
    allNotifications,
    darkMode,
    topTeamsError,
    openNotificationsError,
    allNotificationsError,
  ]);

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: darkMode ? "white" : "black",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "white" : "black",
        },
      },
      y: {
        ticks: {
          color: darkMode ? "white" : "black",
        },
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: darkMode ? "white" : "black",
        },
      },
    },
  };

  const stackedBarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: darkMode ? "white" : "black",
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: darkMode ? "white" : "black",
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: darkMode ? "white" : "black",
        },
      },
    },
  };

  if (topTeamsError || openNotificationsError || allNotificationsError) {
    return <div>Error loading data</div>;
  }
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <section
        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3 mx-3 my-3 ${
          language === "fa" && "rtl"
        }`}
      >
        <DashboardCard
          activeTorrents={opens}
          darkMode={darkMode}
          chart={
            <Doughnut data={doughnutData} options={doughnutChartOptions} />
          }
        />
        <DashboardCard
          activeTorrents={topTeamsText}
          darkMode={darkMode}
          chart={<Bar data={barChartData} options={stackedBarChartOptions} />}
        />
      </section>
      <section
        className={`grid grid-cols-1 gap-3 mx-3 my-3 ${
          language === "fa" && "rtl"
        }`}
      >
        <DashboardCard
          activeTorrents={receive}
          darkMode={darkMode}
          chart={<Line data={lineChartData} options={lineChartOptions} />}
        />
      </section>
    </>
  );
}

export default Team724Charts;
