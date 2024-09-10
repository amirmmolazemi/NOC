import { Link } from "react-router-dom";

function Button({ text, darkMode }) {
  return (
    <Link to="/">
      <button
        className={`font-semibold px-6 py-3 rounded-lg ${
          darkMode ? "bg-gray-700 text-white" : "bg-gray-700 text-white"
        }`}
      >
        {text}
      </button>
    </Link>
  );
}

export default Button;
