import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import api from "configs/api";
import UserActions from "./UserActions";
import EditUserModal from "./EditUserModal";

function UserTable({ users, darkMode }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const deleteHandler = async (id) => {
    try {
      const token = Cookies.get("token");
      await api.delete(`/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const openEditModal = (user) => {
    setSelectedUserId(user.id);
    setEditUserData({
      username: user.username,
      password: "",
      email: user.email,
      role: user.id !== user.team[0]?.head?.id && user.role.name,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      await api.put(`/user/${selectedUserId}`, editUserData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User data saved successfully!");
      setShowModal(false);
    } catch (error) {
      toast.error("Error saving user data");
    }
  };

  return (
    <>
      <table
        className={`shadow-lg rounded-lg overflow-hidden min-w-full mt-6 mb-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <thead
          className={`border-b ${
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800"
          }`}
        >
          <tr>
            <th className="p-3 text-center">ID</th>
            <th className="p-3 text-center">Name</th>
            <th className="p-3 text-center">Role</th>
            <th className="p-3 text-center">Team</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className={`font-semibold transition duration-200 hover:bg-opacity-80 ${
                  darkMode
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <td className="p-3 text-center">{user.id}</td>
                <td className="p-3 text-center">{user.username}</td>
                <td className="p-3 text-center">{user.role.name}</td>
                <td className="p-3 text-center">
                  {user.team.map((team) => (
                    <div key={team.id}>
                      <p>{team.name}</p>
                    </div>
                  ))}
                </td>
                <td className="p-3 text-center flex justify-center items-center gap-4">
                  <UserActions
                    deleteHandler={() => deleteHandler(user.id)}
                    editHandler={() => openEditModal(user)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className={`p-3 text-center ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Users not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && (
        <EditUserModal
          darkMode={darkMode}
          userData={editUserData}
          setUserData={setEditUserData}
          closeModal={() => setShowModal(false)}
          saveHandler={handleSave}
          isHead={
            selectedUserId &&
            users.find((user) => user.id === selectedUserId)?.team[0]?.head
              ?.id === selectedUserId
          } // ارسال مقدار صحیح
        />
      )}
    </>
  );
}

export default UserTable;
