// HOOKS
import { useTranslation } from "react-i18next";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContext } from "react";

// CONTEXTS
import { langContext } from "../contexts/languageContext";

function UserBadge() {
  const { t } = useTranslation();
  const { getItem } = useLocalStorage();
  const { lang } = useContext(langContext);

  const userData = getItem("user_data");

  return (
    <div className={`user-badge flex-wrapper ${userData.role_en}`}>
      <span className="letter flex-center">{lang == "en" ? userData.name_en[0] : userData.name_ar[0]}</span>
      <div className="wrapper">
        <h4 className="name">{lang == "en" ? userData.name_en : userData.name_ar}</h4>
        <span className="role">{lang == "en" ? userData.role_en : userData.role_ar}</span>
      </div>
    </div>
  );
}

export default UserBadge;