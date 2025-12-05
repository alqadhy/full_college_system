// HOME CSS FILE
import "../../assets/css/pages/home.css";

// HOME PAGE SECTIONS
import Hero from "../../components/HomePageSections/Hero";
import Features from "../../components/HomePageSections/Features";
import Departments from "../../components/HomePageSections/Departments";
import CallToAction from "../../components/HomePageSections/CallToAction";

// HOOKS
import { useTranslation } from "react-i18next";
import usePageTitle from "../../hooks/usePageTitle";

function Home() {
  const { t } = useTranslation();

  // SET PAGE TITLE
  usePageTitle(t("pages.home"));

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