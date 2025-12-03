// MAIN CSS FILES
import "./assets/css/global_rules.css";
import "./assets/css/global_classes.css";
import "./assets/css/components.css";
import "./assets/css/animations.css";
import "./assets/css/rtl_changes.css";

// LAZY LOADING 
import { Suspense, lazy } from "react";

// REACT ROUTER
import { Route, Routes } from "react-router-dom";

// COMPONENTS
import PageLoader from "./components/PageLoader.jsx";
const Header = lazy(() => import("./components/Header.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

// PAGES 
const Home = lazy(() => import("./pages/public/Home.jsx"));
const Login = lazy(() => import("./pages/public/Login.jsx"));
const NotFound = lazy(() => import("./pages/public/NotFound.jsx"));
const StudentDashboard = lazy(() => import("./pages/student/Dashboard.jsx"));
const StudentAssignments = lazy(() => import("./pages/student/Assignments.jsx"));

// HOOKS
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useLocalStorage from "./hooks/useLocalStorage.js";

// Utils Functions
import { setThemeColors, setWebsiteFavicon, changePageDirection } from "./utils/index.js";

// CONTEXTS
import { langContext } from "./contexts/languageContext";
import { userDataContext } from "./contexts/userDataContext";
import { sidebarContext } from './contexts/sidebarContext';

// REACT TOASTIFY
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const { t } = useTranslation();
  const { getItem } = useLocalStorage();
  const [lang, setLang] = useState(getItem("lang") || "en");
  const [userData, setUserData] = useState(getItem("user_data"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // DYNAMIC THEME COLORS
    setThemeColors(t("main_style_colors.primary_color"), t("main_style_colors.secondary_color"));
    // DYNAMIC PAGE FAVICON
    setWebsiteFavicon(t("university_data.logo.icon"));
    // DYNAMIC SET PAGE DIRECTION
    changePageDirection(lang === "ar" ? "rtl" : "ltr");
  }, []);

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <langContext.Provider value={{ lang: lang, setLang: setLang }}>
          <userDataContext.Provider value={{ userData: userData, setUserData: setUserData }}>
            <sidebarContext.Provider value={{ isSidebarOpen: isSidebarOpen, setIsSidebarOpen: setIsSidebarOpen }}>
              <Header />
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />

                {/* student Pages */}
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/assignments" element={<StudentAssignments />} />
              </Routes>
            </sidebarContext.Provider>
            <Footer />
          </userDataContext.Provider>
        </langContext.Provider>
      </Suspense>

      <ToastContainer />
    </>
  );
}

export default App;
