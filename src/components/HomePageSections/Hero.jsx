// HOOKS
import { useTranslation } from "react-i18next";

// REACT ROUTER
import { Link } from 'react-router-dom';

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" style={{ backgroundImage: `url(${t("university_data.background_img")})` }}>
      <div className="container">
        <div className="content">
          <h1 className="font-large">
            {t("headings_and_titles.main_heading")}
          </h1>
          <p>{t("descriptions_and_paragraphs.main_description")}</p>
          <Link to="/student/dashboard" className="main-btn" title={t("buttons_and_links.access_dashboard_button")}>
            {t("buttons_and_links.access_dashboard_button")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;