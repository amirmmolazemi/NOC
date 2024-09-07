import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "src/utils/fetcher";
import { FiMinusCircle } from "react-icons/fi";
import Cookies from "js-cookie";
import Pagination from "../pagination/Pagination";
import { toast } from "react-toastify";
import api from "src/configs/api";

function MemberModal({ darkMode, closeModal, team }) {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const { data: fetchedUsers, isValidating } = useSWR(
    `/user?size=10&page=${page}&team=${team}`,
    fetcher
  );

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers.users);
      setPage(fetchedUsers.page || 1);
      setTotalPages(fetchedUsers.totalPages || 1);
      console.log(fetchedUsers);
    }
  }, [fetchedUsers]);

  const deleteMemberHandler = async (teamId, userId) => {
    try {
      const token = Cookies.get("token");
      await api.delete(`/team/${teamId}/member`, {
        data: { userId },
        headers: { Authorization: `Bearer ${token}` },
      });
      mutate(`/team?size=10&page=${page}`);
      toast.success("Team deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting Team");
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
          <div className="relative flex-auto p-6">
            <table
              className={`shadow-lg rounded-lg overflow-hidden min-w-full mt-6 mb-6 ${
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
                  <th className="p-3 text-center">role</th>
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
                        {user?.role?.name !== "Head" && (
                          <button
                            className="text-red-500 hover:text-red-700"
                            title="View Members"
                            onClick={() =>
                              deleteMemberHandler(user.team.id, user.id)
                            }
                          >
                            <FiMinusCircle size={20} />
                          </button>
                        )}
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
                      Loading ...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
          <div className="flex items-center justify-end p-6 rounded-b">
            <button
              className="px-6 py-2 mr-2 text-sm font-bold uppercase cursor-pointer text-red-500"
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
