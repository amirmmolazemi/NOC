import { useState } from "react";
import { deleteHandler, editHandler } from "api/index";
import UserActions from "./UserActions";
import EditUserModal from "./EditUserModal";
import { openEditModal } from "utils/helpers";

function UserTable({ users, darkMode, page }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });

  return (
    <>
      <table
        className={`shadow-lg rounded-lg overflow-hidden min-w-full mt-3 mb-6 ${
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
          {users ? (
            users.map((user) => (
              <tr
                key={user.id}
                className={`font-semibold transition duration-200 hover:bg-opacity-80 ${
                  darkMode
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <td className="p-3 text-center">{user?.id}</td>
                <td className="p-3 text-center">{user?.username}</td>
                <td className="p-3 text-center">{user?.role?.name}</td>
                <td className="p-3 text-center">{user?.team?.name}</td>
                <td className="p-3 text-center flex justify-center items-center gap-4">
                  <UserActions
                    deleteHandler={() => deleteHandler(user?.id, page)}
                    editHandler={() =>
                      openEditModal(
                        setEditUserData,
                        setShowModal,
                        setSelectedUserId,
                        user
                      )
                    }
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
          editHandler={() =>
            editHandler(selectedUserId, editUserData, setShowModal, page)
          }
          isHead={
            selectedUserId &&
            users.find((user) => user.id === selectedUserId)?.team?.[0]?.head
              ?.id === selectedUserId
          }
        />
      )}
    </>
  );
}

export default UserTable;
