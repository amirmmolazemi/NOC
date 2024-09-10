import Pagination from "../pagination/Pagination";
import UsersList from "./UsersList";

function AddTeamModalInputs(props) {
  const {
    formData,
    setFormData,
    darkMode,
    isLoading,
    users,
    totalPages,
    errors,
    page,
    setPage,
  } = props;
  return (
    <>
      {["name", "headId"].map((field, index) => (
        <div className="mb-4" key={index}>
          <label className="block mb-1 text-sm font-medium capitalize">
            {field === "headId" ? "Head" : field}
          </label>
          {field !== "headId" ? (
            <input
              type="text"
              value={formData[field]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
              className={`w-full p-2 rounded ${
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-white text-black border"
              }`}
            />
          ) : (
            <>
              {!isLoading ? (
                <>
                  {users?.filter((user) => !user.team) ? (
                    <>
                      <UsersList
                        darkMode={darkMode}
                        users={users}
                        editTeamData={formData}
                        setEditTeamData={setFormData}
                      />
                      {totalPages > 1 && users && (
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
                  )}
                </>
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
    </>
  );
}

export default AddTeamModalInputs;
