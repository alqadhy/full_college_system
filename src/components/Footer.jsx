// HOOKS
import { useTranslation } from "react-i18next";
import { useContext } from "react";

// COMPONENTS
import Logo from "./Logo";

// REACT ROUTER
import { Link } from "react-router-dom";

// CONTEXTS
import { userDataContext } from "../contexts/userDataContext";

// ICONS
import { FaPhoneAlt, FaFacebookF, FaSnapchatGhost } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

function getSocialMediaIcon(socialMediaPlatform) {
  switch (socialMediaPlatform) {
    case "Facebook":
      return <FaFacebookF className="icon" />
    case "X":
      return <FaXTwitter className="icon" />
    case "Instagram":
      return <FaInstagram className="icon" />
    case "LinkedIn":
      return <FaLinkedinIn className="icon" />
    case "Snapchat":
      return <FaSnapchatGhost className="icon" />
  }
}

function Footer() {
  const { t } = useTranslation();
  const { userData } = useContext(userDataContext);

  console.log(userData);


  const socialMediaPlatforms = t("university_data.social_media", { returnObjects: true });

  return (
    <footer>
      <div className="top">
        <div className="container">
          <div className="col">
            <Logo />
            <p>{t("descriptions_and_paragraphs.secondary_description")}</p>
          </div>

          <div className="col">
            <h3 className="col-title font-medium">{t("headings_and_titles.links_heading")}</h3>
            <ul className="links">
              <li><Link to="/">{t("pages.home")}</Link></li>
              <li><Link to="/student/dashboard">{t("pages.dashboard")}</Link></li>
              <li><Link to="/login">{userData ? t("pages.log_out") : t("pages.login")}</Link></li>
            </ul>
          </div>

          <div className="col">
            <h3 className="col-title font-medium">{t("headings_and_titles.contact_us_heading")}</h3>
            <ul className="contact-info">
              <li>
                <a className="flex-wrapper" title={t("university_data.phone")} href={"tel:" + t("university_data.phone")}>
                  <FaPhoneAlt className="icon" />
                  <span className="force-ltr">{t("university_data.phone")}</span>
                </a>
              </li>
              <li>
                <a className="flex-wrapper" title={t("university_data.email")} href={"mailto:" + t("university_data.email")}>
                  <MdEmail className="icon" />
                  <span className="force-ltr">{t("university_data.email")}</span>
                </a>
              </li>
              <li className="flex-wrapper" title={t("university_data.location")}>
                <IoLocation className="icon" /> {t("university_data.location")}
              </li>
            </ul>
          </div>

          <div className="col">
            <h3 className="col-title font-medium">{t("headings_and_titles.social_media_heading")}</h3>
            <ul className="social-icons flex-wrapper">
              {
                Object.entries(socialMediaPlatforms).map(([key, { title, url }]) => (
                  <li key={key}>
                    <a className="flex-center" href={url} title={title}>{getSocialMediaIcon(title)}</a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="container">
          <p>
            {t("text.copyrights_text")} &copy; 2000 - {new Date().getFullYear()} | {t("text.all_right_reserved_text")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;