// StudentDashboard CSS File
import "../../assets/css/pages/stu_dashboard.css";

// HOOKS
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import useRedirect from "../../hooks/useRedirect";

// REACT ROUTER
import { Link } from "react-router-dom";

// CONTEXTS
import { langContext } from "../../contexts/languageContext";
import { userDataContext } from "../../contexts/userDataContext";
import { userTasksContext } from "../../contexts/userTasks";

// COMPONENTS
import PageLoader from './../../components/PageLoader';
import Sidebar from "../../components/Sidebar";
import Widget from "../../components/Widget";
import FeesProgressBar from "../../components/FeesProgressBar";
import RowBox from "../../components/RowBox";
import TaskBox from "../../components/TaskBox";
import MessageBox from "../../components/MessageBox";
import TodayLecturesTable from "../../components/TodayLecturesTable";

// ICNOS
import { FaHome, FaFileAlt, FaMoneyBillAlt, FaTasks } from "react-icons/fa";
import { MdDashboard, MdEvent } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { GiArchiveRegister } from "react-icons/gi";
import { TbCircleLetterA } from "react-icons/tb";
import { AiFillSchedule, AiOutlineMessage } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr";

// PIE CHART COMPONENT
import { PieChart } from "react-minimal-pie-chart";

function Dashboard() {
  const { t } = useTranslation();
  const { lang } = useContext(langContext);
  const { userData } = useContext(userDataContext);
  const { userTasks } = useContext(userTasksContext);
  const [stuStats, setStuStats] = useState(null);
  const [requiredAssignments, setRequiredAssignments] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [stuSchedule, setStuSchedule] = useState({});

  // Student Pages 
  const userAccessPagesArr = [
    { id: 1, icon: <FaHome className="icon" />, title: t("pages.home"), path: "/" },
    { id: 2, icon: <MdDashboard className="icon" />, title: t("pages.dashboard"), path: "/student/dashboard" },
    { id: 3, icon: <FaFileAlt className="icon" />, title: t("pages.assignments"), path: "/student/assignments" },
    { id: 4, icon: <MdEvent className="icon" />, title: t("pages.events"), path: "/student/events" },
    { id: 5, icon: <IoSchool className="icon" />, title: t("pages.enrolled_courses"), path: "/student/enrolled-courses" },
    { id: 6, icon: <GiArchiveRegister className="icon" />, title: t("pages.enroll_new_course"), path: "/student/enroll-new-course" },
    { id: 7, icon: <TbCircleLetterA className="icon" />, title: t("pages.marks"), path: "/student/marks" },
    { id: 8, icon: <AiFillSchedule className="icon" />, title: t("pages.weekly_schedule"), path: "/student/weekly-schedule" },
    { id: 9, icon: <FaMoneyBillAlt className="icon" />, title: t("pages.payments_and_fees"), path: "/student/payments-and-fees" },
    { id: 10, icon: <FaTasks className="icon" />, title: t("pages.to_do_list"), path: "/student/to-do-list" },
    { id: 11, icon: <AiOutlineMessage className="icon" />, title: t("pages.messages"), path: "/student/messages" },
    { id: 12, icon: <GrAnnounce className="icon" />, title: t("pages.announcements"), path: "/student/announcements" },
  ];

  // Quick Access Btns Pages IDs
  const quickAccessBtnsArr = [3, 8, 9, 6];

  // Today's Name
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

  // SET PAGE TITLE
  usePageTitle(t("pages.dashboard"));

  // Redirect to the login page if the student is not logged in!
  useRedirect({
    isAuthorized: userData,
    errorMsg: t("alerts.must_login"),
    redirectionRoute: "/login",
  });

  // Fetch Required Data
  useEffect(() => {
    // Studnet Statistics
    fetch("/data/stu_stats.json")
      .then(res => res.json())
      .then(data => setStuStats(data));

    // Required Assignments
    fetch("/data/required_assignments.json")
      .then(res => res.json())
      .then(data => setRequiredAssignments(data));

    // Upcoming Events
    fetch("/data/upcoming_events.json")
      .then(res => res.json())
      .then(data => setUpcomingEvents(data));

    // Recent Messages
    fetch("/data/recent_messages.json")
      .then(res => res.json())
      .then(data => setRecentMessages(data));

    // Student Schedule
    fetch("/data/stu_weekly_schedule.json")
      .then(res => res.json())
      .then(data => setStuSchedule(data));
  }, []);

  if (userData && stuStats && stuSchedule[todayName])
    return (
      <main className="stu-dashboard-page dashboard-page">
        <Sidebar userAccessPagesArr={userAccessPagesArr} />

        <section className="side-container is-grid">
          <Widget colsNum={3} title={t("headings_and_titles.student_details_title")}>
            <div className="user-details-wrapper">
              <div className="box img-container">
                <img src={userData.image} alt={lang == "en" ? userData.name_en : userData.name_ar} title={lang == "en" ? userData.name_en : userData.name_ar} />
              </div>
              <div className="box">
                <h4 className="attribute bold-title">{t("text.student_attributes_text.code")}</h4>
                <span className="data-txt">{userData.code}</span>
              </div>
              <div className="box">
                <h4 className="attribute bold-title">{t("text.student_attributes_text.name")}</h4>
                <span className="data-txt">{lang == "en" ? userData.name_en : userData.name_ar}</span>
              </div>
              <div className="box">
                <h4 className="attribute bold-title">{t("text.student_attributes_text.email")}</h4>
                <span className="data-txt">{userData.email}</span>
              </div>
              <div className="box">
                <h4 className="attribute bold-title">{t("text.student_attributes_text.phone")}</h4>
                <span className="data-txt">{userData.phone}</span>
              </div>
              <div className="box">
                <h4 className="attribute bold-title">{t("text.student_attributes_text.address")}</h4>
                <span className="data-txt">{lang == "en" ? userData.address_en : userData.address_ar}</span>
              </div>
            </div>
            <div className="quick-access-btns">
              {
                quickAccessBtnsArr.map(pageId => {
                  return (
                    <Link to={userAccessPagesArr[pageId - 1].path} className="quick-access-btn flex-wrapper"
                      title={userAccessPagesArr[pageId - 1].title} key={pageId}>
                      {userAccessPagesArr[pageId - 1].icon} {userAccessPagesArr[pageId - 1].title}
                    </Link>
                  );
                })
              }
            </div>
          </Widget>

          <Widget rowsNum={2} colsNum={2} title={t("headings_and_titles.stats_title")}>
            <div className="grid-gap">
              <div className="box">
                <h4 className="bold-title">{t("text.attendence_percentage_text")}</h4>
                <div className="chart-container" style={{ width: "170px", marginTop: "30px" }}>
                  <PieChart
                    data={[
                      { title: "Present", value: stuStats.attendance_percentage, color: t("main_style_colors.primary_color") },
                      { title: "Absent", value: 100 - stuStats.attendance_percentage, color: "#eee" }
                    ]}
                    lineWidth={20}
                    rounded
                    animate
                    label={() => `${stuStats.attendance_percentage}%`}
                    labelStyle={{
                      fontSize: "24px",
                      fill: "#333",
                    }}
                    labelPosition={0}
                  />
                </div>
              </div>
              <div className="box">
                <h4 className="bold-title">{t("text.paid_money_text")}</h4>
                <FeesProgressBar paid_amount={stuStats.paid_amount} total_fees={stuStats.fees_total} />
              </div>
              <div className="box">
                <h4 className="bold-title">{t("text.student_attributes_text.gpa")}: {stuStats.gpa}</h4>
              </div>
            </div>
          </Widget>

          <Widget colsNum={1} title={t("headings_and_titles.required_assignments_title")}
            showEmptyParagrah={requiredAssignments.length == 0} showViewAllLink={requiredAssignments.length != 0}
            viewAllLinkTxt={t("buttons_and_links.view_all_link")} viewAllLinkPath="/student/assignments">
            <div className="grid-gap">
              {
                requiredAssignments.length != 0 &&
                requiredAssignments.map(assignment => {
                  return (
                    <RowBox key={assignment.id} icon={<FaFileAlt className="icon" />}
                      title={assignment.title} documentLink={assignment.document_link} />
                  );
                })
              }
            </div>
          </Widget>

          <Widget colsNum={1} title={t("headings_and_titles.upcoming_events_title")} showEmptyParagrah={upcomingEvents.length == 0} showViewAllLink={upcomingEvents.length != 0}
            viewAllLinkTxt={t("buttons_and_links.view_all_link")} viewAllLinkPath="/student/events">
            <div className="grid-gap">
              {
                upcomingEvents.length != 0 &&
                upcomingEvents.map(event => {
                  return (
                    <RowBox key={event.id} icon={<MdEvent className="icon" />}
                      title={lang == "en" ? event.title_en : event.title_ar} />
                  );
                })
              }
            </div>
          </Widget>

          <Widget rowsNum={2} colsNum={2} title={t("headings_and_titles.today_tasks_title")} showEmptyParagrah={userTasks.length == 0} showViewAllLink={userTasks.length != 0}
            viewAllLinkTxt={t("buttons_and_links.manage_all_tasks_link")} viewAllLinkPath="/student/todo-list">
            <div className="grid-gap">
              {
                userTasks.length != 0 &&
                userTasks.map(task => <TaskBox key={task.id} taskObj={task} />)
              }
            </div>
          </Widget>

          <Widget colsNum={1} title={t("headings_and_titles.recent_messages_title")} showEmptyParagrah={recentMessages.length == 0} showViewAllLink={recentMessages.length != 0}
            viewAllLinkTxt={t("buttons_and_links.view_all_link")} viewAllLinkPath="/student/messages">
            <div className="grid-gap">
              {
                recentMessages.length != 0 &&
                recentMessages.map(msg => {
                  return (
                    <MessageBox key={msg.id} msgPath={`student/messages/${msg.id}`}
                      senderPic={msg.sender_profile_pic} senderName={lang == "en" ? msg.sender_name_en : msg.sender_name_ar}
                      subject={lang == "en" ? msg.subject_en : msg.subject_ar} />
                  );
                })
              }
            </div>
          </Widget>

          <TodayLecturesTable stuSchedule={stuSchedule} todayName={todayName} />
        </section>
      </main>
    );
  else
    return <PageLoader />;
}

export default Dashboard;