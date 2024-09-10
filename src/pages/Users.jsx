import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// components
import Loader from "components/loader/Loader";
import UserTable from "components/users/UserTable";
import Pagination from "components/pagination/Pagination";
import AddUserModal from "components/users/AddUserModal";

// hooks
import useUserRole from "hooks/useUserRole";

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { data, isLoading } = useUserRole(
    false,
    "Admin",
    `/user?size=10&page=${page}`
  );

  useEffect(() => {
    if (data?.otherData && !showModal) {
      const { users, page, totalPages } = data?.otherData;
      setUsers(users);
      setPage(page || 1);
      setTotalPages(totalPages || 1);
    }
  }, [data, showModal]);

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <h1
        className={`text-3xl font-bold text-center text-gray-${
          darkMode ? "200" : "800"
        }`}
      >
        Users
      </h1>
      <button
        className="font-semibold px-4 py-2 rounded transition duration-200 bg-green-600 text-gray-100 hover:bg-green-500"
        onClick={() => setShowModal(true)}
      >
        Add User
      </button>
      <UserTable users={users} darkMode={darkMode} page={page} />
      {totalPages > 1 && users && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
      {showModal && (
        <AddUserModal
          darkMode={darkMode}
          closeModal={() => setShowModal(false)}
          page={page}
        />
      )}
    </div>
  );
}

export default Users;
