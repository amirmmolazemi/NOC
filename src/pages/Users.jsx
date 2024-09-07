import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import useUserRole from "hooks/useUserRole";
import Loader from "components/loader/Loader";
import UserTable from "components/users/UserTable";
import Pagination from "components/pagination/Pagination";
import AddUserModal from "components/users/AddUserModal";
import api from "configs/api";
import { mutate } from "swr";

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

  const addUserHandler = async (newUser) => {
    try {
      const token = Cookies.get("token");
      await api.post("/user", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      mutate(`/user?size=10&page=${page}`);
      toast.success("User added successfully!");
    } catch (error) {
      toast.error("Error adding user");
    }
  };

  useEffect(() => {
    if (data?.otherData && !showModal) {
      const { users, page, totalPages } = data.otherData;
      setUsers(users || []);
      setPage(page || 1);
      setTotalPages(totalPages || 1);
    }
  }, [data, showModal]);

  if (isLoading) return <Loader />;

  return (
    <div className={`container mx-auto mt-8 p-4`}>
      <h1
        className={`text-3xl font-bold mb-12 text-center text-gray-${
          darkMode ? "200" : "800"
        }`}
      >
        Users
      </h1>
      <button
        className={`font-semibold px-4 py-2 rounded transition duration-200 bg-green-600 text-gray-100 hover:bg-green-500`}
        onClick={() => setShowModal(true)}
      >
        Add User
      </button>
      <UserTable users={users} darkMode={darkMode} page={page} />
      {users.length && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
      {showModal && (
        <AddUserModal
          darkMode={darkMode}
          closeModal={() => setShowModal(false)}
          addUserHandler={addUserHandler}
        />
      )}
    </div>
  );
}

export default Users;
