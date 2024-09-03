import { FiTrash2, FiEdit } from "react-icons/fi";

function UserActions({ deleteHandler, editHandler }) {
  return (
    <>
      <button
        className="text-red-500 hover:text-red-700"
        title="Delete User"
        onClick={deleteHandler}
      >
        <FiTrash2 size={20} />
      </button>
      <button
        className="text-blue-500 hover:text-blue-700"
        title="Edit User"
        onClick={editHandler}
      >
        <FiEdit size={20} />
      </button>
    </>
  );
}

export default UserActions;
