import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "src/utils/fetcher";
import { FiMinusCircle } from "react-icons/fi";
import Cookies from "js-cookie";
import Pagination from "../pagination/Pagination";
import { toast } from "react-toastify";
import api from "src/configs/api";

function MemberModal({ darkMode, closeModal, team, teamId }) {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: fetchedUsers, isValidating } = useSWR(
    `/user?size=5&page=${page}&team=${team}`,
    fetcher
  );
  const { data: fetchedAllUsers } = useSWR(`/user?size=5&page=off`, fetcher);

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers.users);
      setPage(fetchedUsers.page || 1);
      setTotalPages(fetchedUsers.totalPages || 1);
    }
    if (fetchedAllUsers) {
      const usersWithoutTeam = fetchedAllUsers.filter((user) => !user.team);
      setAllUsers(usersWithoutTeam);
      setFilteredUsers(usersWithoutTeam);
    }
  }, [fetchedUsers, fetchedAllUsers]);

  useEffect(() => {
    setFilteredUsers(
      allUsers
        .filter((user) => user.role?.name !== "Head")
        .filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [searchTerm, allUsers]);

  const deleteMemberHandler = async (teamId, userId) => {
    try {
      const token = Cookies.get("token");
      await api.delete(`/team/${teamId}/member`, {
        data: { userId },
        headers: { Authorization: `Bearer ${token}` },
      });
      mutate(`/user?size=5&page=${page}&team=${team}`);
      mutate(`/user?size=5&page=off`);
      toast.success("Team deleted successfully!");
    } catch (error) {
      toast.error("Error deleting Team");
    }
  };

  const addHandler = async () => {
    try {
      const token = Cookies.get("token");
      const selectedUserId = parseInt(selectedUser, 10);
      await api.post(
        `/team/${teamId}/member`,
        { userId: selectedUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAllUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUserId)
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUserId)
      );
      mutate(`/user?size=5&page=${page}&team=${team}`);
      mutate(`/user?size=5&page=off`);
      setSelectedUser("");
      toast.success("Member added successfully!");
    } catch (error) {
      toast.error("Error adding member");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="relative z-50 w-[85%] max-w-4xl mx-auto my-auto">
        <div
          className={`relative flex flex-col w-full rounded-lg shadow-lg border-0 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-100 text-black"
          }`}
        >
          <div className="flex items-start justify-between p-5 rounded-t">
            <h3 className="text-3xl font-semibold">Members of {team}</h3>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-t">
            <button
              className={`font-semibold px-4 py-2 rounded transition duration-200 ${
                showDropDown
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-green-600 hover:bg-green-500"
              } text-gray-100`}
              onClick={() => setShowDropDown((prev) => !prev)}
            >
              {showDropDown ? "Cancel" : "Add Member"}
            </button>
            {showDropDown && (
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search user"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`mb-2 border p-2 rounded transition duration-200 ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 border-gray-600"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                />
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className={`mb-2 border p-2 rounded transition duration-200 overflow-auto max-h-40 ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 border-gray-600"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                >
                  <option value="">Select a user</option>
                  {filteredUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedUser && showDropDown && (
              <button
                className="font-semibold px-4 py-2 rounded transition duration-200 bg-green-600 hover:bg-green-500 text-gray-100"
                onClick={addHandler}
              >
                Submit
              </button>
            )}
          </div>
          <div className="relative flex-auto p-6">
            <table
              className={`shadow-lg rounded-lg overflow-hidden min-w-full mb-6 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <thead
                className={`border-b ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <tr>
                  <th className="p-3 text-center">ID</th>
                  <th className="p-3 text-center">Name</th>
                  <th className="p-3 text-center">Role</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!isValidating ? (
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
                      <td className="p-3 text-center">
                        {user?.role?.name !== "Head" ? (
                          <button
                            className="text-red-500 hover:text-red-700"
                            title="View Members"
                            onClick={() =>
                              deleteMemberHandler(user.team.id, user.id)
                            }
                          >
                            <FiMinusCircle size={20} />
                          </button>
                        ) : (
                          <p className="text-red-500 font-bold">Not Allowed</p>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className={`p-3 text-center text-lg font-semibold ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination totalPages={totalPages} page={page} setPage={setPage} />
          </div>
          <div className="flex items-center justify-end p-6">
            <button
              className="text-red-500 hover:text-red-700 transition duration-200 font-semibold px-6 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberModal;
