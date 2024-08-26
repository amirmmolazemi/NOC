import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "Redux/slices/languageSlice";
import flagUk from "assets/flag-uk.png";
import flagIr from "assets/flag-ir.png";

function LanguageToggle() {
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleLanguage())}
      className="mb-4 ml-3 w-7 h-auto "
    >
      <img
        src={language === "en" ? flagUk : flagIr}
        alt={language === "en" ? "English Flag" : "Iranian Flag"}
        className="rounded-full"
      />
    </button>
  );
}

export default LanguageToggle;
