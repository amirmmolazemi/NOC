import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "components/loader/Loader";
import useUserRole from "hooks/useUserRole";

function Teams() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { data, isLoading } = useUserRole(false, "Admin", "/user");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (data?.otherData) setTeams(data.otherData.teams);
    console.log(data);
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className={`container mx-auto mt-8 p-4`}>
      <h1
        className={`text-3xl font-bold mb-12 text-center ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Teams
      </h1>
      <button
        className={`font-semibold px-4 py-2 rounded transition duration-200 ${
          darkMode
            ? "bg-green-600 text-gray-100 hover:bg-green-500"
            : "bg-green-500 text-white hover:bg-green-400"
        }`}
      >
        Add User
      </button>
      {console.log(teams)}
    </div>
  );
}

export default Teams;
