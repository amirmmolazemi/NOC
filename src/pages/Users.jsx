import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "components/loader/Loader";
import useUserRole from "hooks/useUserRole";
import UserTable from "components/users/UserTable";
import Pagination from "components/alerts/Pagination";
import AddUserModal from "components/users/AddUserModal";
import { toast } from "react-toastify";
import api from "src/configs/api";
import Cookies from "js-cookie";
import { mutate } from "swr";

function Users() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { data, isLoading } = useUserRole(false, "Admin", "/user?size=10");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const addUserHandler = useCallback(async (newUser) => {
    try {
      const token = Cookies.get("token");
      await api.post("/user", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User added successfully!");
      mutate("/user?size=10");
    } catch (error) {
      console.log(error);
      toast.error("Error adding user");
    }
  }, []);

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
        onClick={() => setShowModal(true)}
      >
        Add User
      </button>
      <UserTable users={users} darkMode={darkMode} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
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
