import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex justify-center items-center mt-[37vh]">
      <ClipLoader loading speedMultiplier={1} size={60} />
    </div>
  );
}

export default Loader;
