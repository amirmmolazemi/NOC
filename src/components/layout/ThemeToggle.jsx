import { FiMoon, FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "Redux/slices/darkmodeSlice";

function ThemeToggle() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="text-3xl"
    >
      {darkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
}

export default ThemeToggle;
