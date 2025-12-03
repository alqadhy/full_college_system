// HOME CSS FILE
import "../../assets/css/pages/home.css";

// HOME PAGE SECTIONS
import Hero from "../../components/HomePageSections/Hero";
import Features from "../../components/HomePageSections/Features";
import Departments from "../../components/HomePageSections/Departments";
import CallToAction from "../../components/HomePageSections/CallToAction";

// HOOKS
import { useTranslation } from "react-i18next";
import { useEffect, useContext } from "react";

// UTILS FUNCTIONS
import { setPageTitle } from "../../utils";

// CONTEXTS
import { langContext } from "../../contexts/languageContext";

function Home() {
  const { t } = useTranslation();
  const { lang } = useContext(langContext);

  useEffect(() => {
    // SET PAGE TITLE
    setPageTitle(t("university_data.short_name") + " - " + t("pages.home"));
  }, [lang]);

  return (
    <>
      <Hero />
      <Features />
      <Departments />
      <CallToAction />
    </>
  );
}

export default Home;