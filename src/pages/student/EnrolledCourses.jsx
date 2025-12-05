// COMPONENTS
import PageLoader from "../../components/PageLoader";
import Sidebar from "../../components/Sidebar";
import PageMainHeading from "../../components/PageMainHeading";
import MainTable from "../../components/MainTable";

// HOOKS
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import usePageTitle from "../../hooks/usePageTitle";
import useRedirect from "../../hooks/useRedirect";

// CONTEXTS
import { langContext } from "../../contexts/languageContext";
import { userDataContext } from "../../contexts/userDataContext";

function EnrolledCourses() {
  const { t } = useTranslation();
  const [stuEnrolledCourses, setStuEnrolledCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { lang } = useContext(langContext);
  const { userData } = useContext(userDataContext);

  // SET PAGE TITLE
  usePageTitle(t("pages.enrolled_courses"));

  // Redirect to the login page if the student is not logged in!
  useRedirect({
    isAuthorized: userData,
    errorMsg: t("alerts.must_login"),
    redirectionRoute: "/login",
  });

  // Fetch Student's All Enrolled Subjects
  useEffect(() => {
    fetch("/data/stu_enrolled_courses.json")
      .then(res => res.json())
      .then(data => setStuEnrolledCourses(data));
  }, []);

  const tableAttributesArr = t("tables_attributes.enrolled_courses_table", { returnObjects: true });

  if (userData && stuEnrolledCourses)
    return (
      <main className="dashboard-page">
        <Sidebar />

        <section className="side-container">
          <PageMainHeading pageTitle={t("headings_and_titles.all_enrolled_courses_heading")}
            searchValue={searchValue} setSearchValue={setSearchValue} showSortBar={false} />

          <MainTable attributesArr={tableAttributesArr}>
            {
              stuEnrolledCourses
                .filter(course => {
                  return (course.course_name_en.toLowerCase().includes(searchValue) ||
                    course.course_name_ar.includes(searchValue));
                })
                .map(course => {
                  return (
                    <tr key={course.id}>
                      <td>{lang == "en" ? course.course_name_en : course.course_name_ar}</td>
                      <td>{course.course_code}</td>
                      <td>{lang == "en" ? course.instructor_en : course.instructor_ar}</td>
                      <td>{course.credit_hours}</td>
                      <td>{course.attendance_percentage}%</td>
                    </tr>
                  );
                })
            }
          </MainTable>
        </section>
      </main>
    );
  else
    return <PageLoader />;
}

export default EnrolledCourses;