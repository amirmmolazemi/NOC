import { useSelector } from "react-redux";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

function Pagination({ page, setPage, totalPages }) {
  const previousHandler = () => page > 1 && setPage((prev) => prev - 1);
  const nextHandler = () => page < totalPages && setPage((prev) => prev + 1);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const renderPageNumber = (num) => (
    <p
      key={num}
      className={`inline-block border font-semibold border-blue-500 w-7 text-center rounded-md ${
        !darkMode ? "text-black" : "text-white"
      } ${page === num ? "bg-blue-500 text-white" : ""}`}
      onClick={() => setPage(num)}
    >
      {num}
    </p>
  );

  return (
    <div className="flex flex-wrap justify-center items-center mx-auto mb-2 w-full max-w-lg px-4 select-none mt-2">
      <div className="flex gap-1">
        <button
          onClick={previousHandler}
          className={`bg-blue-500 text-white px-2 rounded-md text-sm sm:text-lg cursor-pointer ${
            page === 1 ? "opacity-30 cursor-not-allowed" : ""
          }`}
          disabled={page === 1}
        >
          <FaLongArrowAltLeft />
        </button>
        {totalPages <= 4 ? (
          Array.from({ length: totalPages }, (_, index) => index + 1).map(
            renderPageNumber
          )
        ) : (
          <>
            {[1, 2].map(renderPageNumber)}
            {page > 2 && page < totalPages - 1 && (
              <>
                <span className={` ${!darkMode ? "text-black" : "text-white"}`}>
                  ...
                </span>
                {renderPageNumber(page)}
              </>
            )}
            <span className={` ${!darkMode ? "text-black" : "text-white"}`}>
              ...
            </span>
            {[totalPages - 1, totalPages].map(renderPageNumber)}
          </>
        )}
        <button
          onClick={nextHandler}
          className={`bg-blue-500 text-white px-2 rounded-md text-sm sm:text-lg cursor-pointer ${
            page === totalPages ? "opacity-30 cursor-not-allowed" : ""
          }`}
          disabled={page === totalPages}
        >
          <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
