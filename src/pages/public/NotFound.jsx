// NotFound CSS FILE
import "../../assets/css/pages/not_found.css";

// HOOKS
import { useTranslation } from "react-i18next";
import { useEffect, useContext } from "react";

// REACT ROUTER
import { Link } from "react-router-dom";

// CONTEXTS
import { langContext } from "../../contexts/languageContext";

// UTILS FUNCTIONS
import { setPageTitle } from "../../utils";

function NotFound() {
  const { t } = useTranslation();
  const { lang } = useContext(langContext);

  useEffect(() => {
    // SET PAGE TITLE
    setPageTitle(t("university_data.short_name") + " - 404");
  }, [lang]);

  return (
    <main className="not-found-page">
      <div className="container">
        <h1 className="not-found-title font-large">404</h1>
        <p className="font-medium">{t("descriptions_and_paragraphs.404_paragraph")}</p>
        <Link className="main-btn" to="/">{t("buttons_and_links.return_home_button")}</Link>
      </div>
    </main>
  );
}

export default NotFound;