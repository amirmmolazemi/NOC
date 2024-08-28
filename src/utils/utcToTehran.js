const utcChanger = (time) => {
  const utcDate = new Date(time);
  const tehranOffset = 3.5 * 60;
  const localTehranTime = new Date(
    utcDate.getTime() + tehranOffset * 60 * 1000
  );
  return localTehranTime.toISOString().slice(0, 19).replace("T", " ");
};

export default utcChanger;
