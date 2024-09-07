import { useState } from "react";

function UsersList({ darkMode, users, setEditTeamData, editTeamData }) {
  const [isSelect, setIsSelect] = useState(false);

  const selectHandler = (headId) => {
    setEditTeamData({ ...editTeamData, headId });
    setIsSelect(true);
  };
  const removeHandler = () => {
    setEditTeamData({ ...editTeamData, headId: "" });
    setIsSelect(false);
  };
  
  return (
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
          <th className="p-3 text-center">Email</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length ? (
          users.map((user) => {
            return (
              !user.team && (
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
                    {isSelect ? (
                      <button
                        className="font-semibold px-4 py-2 rounded transition duration-200 bg-red-600 text-gray-100 hover:bg-red-500"
                        onClick={() => removeHandler()}
                      >
                        remove
                      </button>
                    ) : (
                      <button
                        className="font-semibold px-4 py-2 rounded transition duration-200 bg-green-600 text-gray-100 hover:bg-green-500"
                        onClick={() => selectHandler(user.id)}
                      >
                        select
                      </button>
                    )}
                  </td>
                </tr>
              )
            );
          })
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
  );
}

export default UsersList;
