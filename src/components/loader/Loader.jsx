import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

function Loader() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className="flex justify-center items-center mt-[37vh]">
      <ClipLoader
        loading
        speedMultiplier={1}
        size={60}
        color={darkMode ? "#fff" : "#000"}
      />
    </div>
  );
}

export default Loader;
