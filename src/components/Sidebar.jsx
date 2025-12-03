// HOOKS
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate, useLocation } from "react-router-dom";

// CONTEXTS
import { langContext } from "../contexts/languageContext";
import { userDataContext } from "../contexts/userDataContext";
import { sidebarContext } from './../contexts/sidebarContext';

// REACT ROUTER
import { Link } from "react-router-dom";

// ICNOS
import { FaHome, FaFileAlt, FaMoneyBillAlt, FaTasks } from "react-icons/fa";
import { MdDashboard, MdEvent } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { GiArchiveRegister } from "react-icons/gi";
import { TbCircleLetterA } from "react-icons/tb";
import { AiFillSchedule, AiOutlineMessage } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

// UTILS FUNCTIONS
import { showPopup, showToastNotification } from "../utils";

function Sidebar() {
  const { t } = useTranslation();
  const { lang } = useContext(langContext);
  const { userData, setUserData } = useContext(userDataContext);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(sidebarContext);
  const { removeItem } = useLocalStorage();
  const navigateTo = useNavigate();
  const location = useLocation();

  // Student Pages 
  const userAccessPagesArr = [
    { id: 1, icon: <FaHome className="icon" />, title: t("pages.home"), path: "/" },
    { id: 2, icon: <MdDashboard className="icon" />, title: t("pages.dashboard"), path: "/student/dashboard" },
    { id: 3, icon: <FaFileAlt className="icon" />, title: t("pages.assignments"), path: "/student/assignments" },
    { id: 4, icon: <MdEvent className="icon" />, title: t("pages.events"), path: "/student/events" },
    { id: 5, icon: <IoSchool className="icon" />, title: t("pages.enrolled_courses"), path: "/student/enrolled_courses" },
    { id: 6, icon: <GiArchiveRegister className="icon" />, title: t("pages.enroll_new_course"), path: "/student/enroll_new_course" },
    { id: 7, icon: <TbCircleLetterA className="icon" />, title: t("pages.marks"), path: "/student/marks" },
    { id: 8, icon: <AiFillSchedule className="icon" />, title: t("pages.weekly_schedule"), path: "/student/weekly_schedule" },
    { id: 9, icon: <FaMoneyBillAlt className="icon" />, title: t("pages.payments_and_fees"), path: "/student/payments_and_fees" },
    { id: 10, icon: <FaTasks className="icon" />, title: t("pages.to_do_list"), path: "/student/to_do_list" },
    { id: 11, icon: <AiOutlineMessage className="icon" />, title: t("pages.messages"), path: "/student/messages" },
    { id: 12, icon: <GrAnnounce className="icon" />, title: t("pages.announcements"), path: "/student/announcements" },
  ];

  function handleUserLogout() {
    const logout = () => {
      // Remove the User Data & The Token From the Local Storage
      removeItem("token");
      removeItem("user_data");
      // Update the User Data To Be Empty (null)
      setUserData(null);
      // Show A Success Toast Notification
      showToastNotification("success", t("alerts.logout_successfully"), lang == "ar" ? "top-left" : "top-right", 2500);
      // Navigate To The Home Page
      navigateTo("/");
    }

    // Show Popup
    showPopup(t("alerts.logout_confirm"), "warning", true,
      t("buttons_and_links.confirm_button"), t("buttons_and_links.cancel_button"), logout);
  }

  return (
    <aside className={isSidebarOpen ? "sidebar open" : "sidebar"}>
      <h4 className="sub-title title flex-space-between">
        {
          lang == "en"
            ? userData.role_en[0].toUpperCase() + userData.role_en.slice(1) + ' ' + t("headings_and_titles.sidebar_title")
            : t("headings_and_titles.sidebar_title") + " ال" + userData.role_ar
        }
        <button className="icon-btn close-btn flex-center" onClick={() => setIsSidebarOpen(false)}>
          <IoCloseSharp className="icon" />
        </button>
      </h4>
      <div className="links">
        {
          userAccessPagesArr.map(page => {
            return (
              <Link key={page.id} to={page.path}
                className={location.pathname == page.path ? "flex-wrapper active" : "flex-wrapper"}>
                {page.icon} {page.title}
              </Link>
            );
          })
        }
        <button className="logout-btn flex-wrapper" onClick={handleUserLogout}>
          <LuLogOut className="icon" /> {t("pages.log_out")}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;