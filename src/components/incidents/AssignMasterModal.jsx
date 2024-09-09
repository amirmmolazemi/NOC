import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "src/utils/fetcher";
import { TfiCrown } from "react-icons/tfi";
import Pagination from "../pagination/Pagination";
import { FiMinusCircle } from "react-icons/fi";

function AssignMasterModal({ darkMode, closeModal, team, setMaster, master }) {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const { data: fetchedUsers, isValidating } = useSWR(
    `/user?size=5&page=${page}&team=${team}&role=Member`,
    fetcher
  );

  useEffect(() => {
    if (fetchedUsers?.users) {
      setUsers(fetchedUsers.users);
      setPage(fetchedUsers.page || 1);
      setTotalPages(fetchedUsers.totalPages || 1);
    }
  }, [fetchedUsers]);

  const handleMasterToggle = (userId) => {
    if (master === userId) setMaster("");
    else setMaster(userId);
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
            <h3 className="text-3xl font-semibold">Your Master Member ...</h3>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-t"></div>
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
                  <th className="p-3 text-center">Email</th>
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
                      <td className="p-3 text-center">{user?.email}</td>
                      <td className="p-3 text-center">
                        {!user.pack_id ? (
                          <>
                            <button
                              title="Assign Master"
                              onClick={() => handleMasterToggle(user.id)}
                            >
                              {master === user.id ? (
                                <FiMinusCircle size={20} color="red" />
                              ) : (
                                <TfiCrown size={20} color="yellow" />
                              )}
                            </button>
                          </>
                        ) : (
                          <p className="text-red-500 font-bold">
                            Already in Action
                          </p>
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

export default AssignMasterModal;
