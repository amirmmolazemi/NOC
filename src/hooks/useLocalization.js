import en from "assets/locales/en.json";
import fa from "assets/locales/fa.json";
import { useSelector } from "react-redux";

export const useLocalization = () => {
  const language = useSelector((state) => state.language.language);

  const getLocalizedText = () => {
    return language === "en" ? en : fa;
  };

  return getLocalizedText();
};
