import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "feature/language/languageSlice";
import flagUk from "assets/images/flag-uk.png";
import flagIr from "assets/images/flag-ir.png";

function LanguageToggle() {
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleLanguage())}
      className="mb-4 w-7 h-auto "
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
