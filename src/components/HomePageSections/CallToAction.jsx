// HOOKS
import { useTranslation } from "react-i18next";

// REACT ROUTER
import { Link } from "react-router-dom";

function CallToAction() {
  const { t } = useTranslation();

  return (
    <section className="call-to-action">
      <div className="container">
        <div className="content">
          <h2 className="font-big">{t("headings_and_titles.call_to_action_heading")}</h2>
          <Link to="/login" className="main-btn" title={t("buttons_and_links.login_now_button")}>
            {t("buttons_and_links.login_now_button")}
          </Link>
        </div>
      </div>

      <span className="pulse-animated"></span>
    </section>
  );
}

export default CallToAction;