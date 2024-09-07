const getChartData = (activeTorrents, darkMode) => {
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: activeTorrents,
        data: [65, 65, 65, 65, 65, 65, 65],
        backgroundColor: darkMode
          ? "rgba(75,192,192,0.6)"
          : "rgba(54, 162, 235, 0.6)",
        borderColor: darkMode ? "rgba(75,192,192,1)" : "rgba(54, 162, 235, 1)",
        borderWidth: 3,
      },
    ],
  };
  return chartData;
};

export default getChartData;
