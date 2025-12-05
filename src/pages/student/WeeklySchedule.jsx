// HOOKS
import { useTranslation } from "react-i18next";
import { useEffect, useState, useContext } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import useRedirect from "../../hooks/useRedirect";

// CONTEXTS
import { userDataContext } from "../../contexts/userDataContext";
import { langContext } from "../../contexts/languageContext";

// COMPONENTS
import PageLoader from "../../components/PageLoader";
import Sidebar from "../../components/Sidebar";
import MainHeading from "../../components/MainHeading";
import StuWeeklySchedule from '../../components/StuWeeklySchedule';

function WeeklySchedule() {
  const { t } = useTranslation();
  const [stuSchedule, setStuSchedule] = useState({});
  const { userData } = useContext(userDataContext);
  const { lang } = useContext(langContext);

  // SET PAGE TITLE
  usePageTitle(t("pages.weekly_schedule"));

  // Redirect to the login page if the student is not logged in!
  useRedirect({
    isAuthorized: userData,
    errorMsg: t("alerts.must_login"),
    redirectionRoute: "/login",
  });

  // Get the student's full schedule
  useEffect(() => {
    fetch("/data/stu_weekly_schedule.json")
      .then(res => res.json())
      .then(data => setStuSchedule(data));
  }, []);

  if (userData && stuSchedule)
    return (
      <main className="dashboard-page">
        <Sidebar />

        <section className="side-container">
          <MainHeading title={t("headings_and_titles.weekly_schedule_heading")} />
          <StuWeeklySchedule stuSchedule={stuSchedule} />
        </section>
      </main>
    );
  else return <PageLoader />;
}

export default WeeklySchedule;