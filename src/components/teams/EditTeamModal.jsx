import { useEffect, useState } from "react";
import UsersList from "./UsersList";
import useSWR from "swr";
import fetcher from "src/utils/fetcher";
import Pagination from "../pagination/Pagination";

function EditTeamModal({
  darkMode,
  setEditTeamData,
  editTeamData,
  closeModal,
  saveHandler,
}) {
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const { data: fetchedUsers, isValidating } = useSWR(
    `/user?size=5&role=Head&page=${page}&team=null`,
    fetcher
  );

  const validateFields = () => {
    const newErrors = {};
    if (!editTeamData.name) newErrors.name = "Name is required.";
    if (!editTeamData.headId) newErrors.headId = "Head is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers.users);
      setPage(fetchedUsers.page || 1);
      setTotalPages(fetchedUsers.totalPages || 1);
    }
  }, [fetchedUsers]);

  const handleSave = () => {
    if (validateFields()) {
      saveHandler();
    }
  };

  const handleChange = (field, value) => {
    setEditTeamData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prevErrors) => {
        const { [field]: removedError, ...rest } = prevErrors;
        return rest;
      });
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
            <h3 className="text-3xl font-semibold">Edit Team</h3>
          </div>
          <div className="relative flex-auto p-6">
            {["name", "headId"].map((field, index) => (
              <div className="mb-4" key={index}>
                <label className="block mb-1 text-sm font-medium capitalize">
                  {field === "headId" ? "New Head" : field}
                </label>
                {field !== "headId" ? (
                  <input
                    type="text"
                    value={editTeamData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className={`w-full p-2 rounded ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-black border"
                    }`}
                  />
                ) : (
                  <>
                    {!isValidating ? (
                      users.filter((user) => !user.team).length ? (
                        <>
                          <UsersList
                            darkMode={darkMode}
                            users={users}
                            editTeamData={editTeamData}
                            setEditTeamData={setEditTeamData}
                          />
                          {totalPages > 1 && users.length > 0 && (
                            <Pagination
                              page={page}
                              totalPages={totalPages}
                              setPage={setPage}
                            />
                          )}
                        </>
                      ) : (
                        <h1 className="text-3xl font-semibold text-center mt-10">
                          We don't have any Head user
                        </h1>
                      )
                    ) : (
                      <h1 className="text-3xl font-semibold text-center mt-10">
                        Loading ...
                      </h1>
                    )}
                  </>
                )}
                {errors[field] && (
                  <p className="text-red-500 text-sm font-semibold mt-1">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end p-6 rounded-b">
            <button
              className="px-6 py-2 mr-2 text-sm font-bold uppercase cursor-pointer text-red-500"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              className="px-6 py-3 text-sm font-bold uppercase cursor-pointer text-white bg-emerald-500 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTeamModal;
