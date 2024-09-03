import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "components/loader/Loader";
import useUserRole from "hooks/useUserRole";
import UserTable from "components/users/UserTable";
import Pagination from "components/alerts/Pagination";

function Users() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { data, isLoading } = useUserRole(false, "Admin", "/user?size=10");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (data?.otherData) {
      setUsers(data.otherData.users);
      setPage(data.otherData.page || 1);
      setTotalPages(data.otherData.totalPages || 1);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className={`container mx-auto mt-8 p-4`}>
      <h1
        className={`text-3xl font-bold mb-12 text-center ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Users
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
      <UserTable users={users} darkMode={darkMode} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default Users;
