import { useState, useEffect } from "react";
import Card from "components/alerts/Card";
import Loader from "components/loader/Loader";
import useUserRole from "hooks/useUserRole";
import Pagination from "components/alerts/Pagination";
import { useSelector } from "react-redux";

function Incidents() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUserRole(
    true,
    "",
    `notifications?page=${page}`
  );
  const [incidents, setIncidents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const darkMode = useSelector((state) => state.theme.darkMode);

  // useEffect(() => {
  //   if (data?.otherData) {
  //     setIncidents(
  //       data.otherData.packs.filter((pack) => pack.type === "Incident") || []
  //     );
  //     setPage(data.otherData.page || 1);
  //     setTotalPages(data.otherData.totalPages || 1);
  //   }
  // }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col h-full p-4">
      {incidents.length ? (
        <>
          {incidents.map((incident) => (
            <Card key={incident.id} incident={incident} />
          ))}
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <h1
            className={`text-3xl text-center ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            No incidents found.
          </h1>
        </div>
      )}
    </div>
  );
}

export default Incidents;
