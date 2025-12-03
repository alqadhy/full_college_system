// HOOKS
import { useTranslation } from "react-i18next";

// REACT ROUTER
import { Link } from "react-router-dom";

function Logo() {
  const { t } = useTranslation();

  return (
    <Link to="/" className="logo flex-wrapper" title={t("university_data.logo.title")}>
      <img src={t("university_data.logo.icon")} alt={t("university_data.logo.title")} />
      {t("university_data.logo.title")}
    </Link>
  );
}

export default Logo;