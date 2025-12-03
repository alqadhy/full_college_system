// HOOKS
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import useLocalStorage from './../hooks/useLocalStorage';
import { useLocation } from "react-router-dom";

// COMPONENTS
import Logo from "./Logo";
import UserBadge from "./UserBadge";

// ICONS
import { AiOutlineMessage } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr";
import { Link } from "react-router-dom";
import { MdOutlineMenuOpen } from "react-icons/md";

// Utils Functions
import { changePageDirection } from "../utils";

// CONTEXTS
import { langContext } from "../contexts/languageContext";
import { userDataContext } from "../contexts/userDataContext";
import { sidebarContext } from './../contexts/sidebarContext';

function Header() {
  const { t, i18n } = useTranslation();
  const { setItem } = useLocalStorage();
  const { lang, setLang } = useContext(langContext);
  const { userData } = useContext(userDataContext);
  const { setIsSidebarOpen } = useContext(sidebarContext);
  const location = useLocation();

  function handleLangChange() {
    // Compute the new language
    const newLang = lang === "en" ? "ar" : "en";
    // Update the state
    setLang(newLang);
    // Update i18next language
    i18n.changeLanguage(newLang);
    // Update page direction
    changePageDirection(newLang === "ar" ? "rtl" : "ltr");
    // Save the new language in the localStorage
    setItem("lang", newLang);
  }

  return (
    <header className="flex-space-between">
      <div className="left flex-wrapper">
        {
          userData && location.pathname.slice(1).startsWith(userData.role_en) &&
          <button className="icon-btn flex-center open-sidebar-btn" onClick={() => setIsSidebarOpen(true)}>
            <MdOutlineMenuOpen className="icon" />
          </button>
        }
        <Logo />
      </div>

      <div className="right flex-wrapper">
        <button className="icon-btn flex-center" onClick={handleLangChange}>
          {(lang == "en" ? "ar" : "en").toUpperCase()}
        </button>
        <button className="icon-btn flex-center"><AiOutlineMessage className="icon" /></button>
        <button className="icon-btn flex-center"><GrAnnounce className="icon" /></button>
        {
          !userData
            ? <Link to="/login" className="main-btn" title={t("pages.login")}>
              {t("pages.login")}
            </Link>
            : <UserBadge />
        }
      </div>
    </header>
  );
}

export default Header;