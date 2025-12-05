// COMPONENTS
import PageLoader from "../../components/PageLoader";
import Sidebar from "../../components/Sidebar";
import PageMainHeading from "../../components/PageMainHeading";
import MainTable from "../../components/MainTable";
import { Switch } from "@mui/material";

// HOOKS
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import usePageTitle from "../../hooks/usePageTitle";
import useRedirect from "../../hooks/useRedirect";

// CONTEXTS
import { langContext } from "../../contexts/languageContext";
import { userDataContext } from "../../contexts/userDataContext";

function EnrollNewCourse() {
  const { t } = useTranslation();
  const [allAvailableCourses, setAllAvailableCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const { lang } = useContext(langContext);
  const { userData } = useContext(userDataContext);

  // SET PAGE TITLE
  usePageTitle(t("pages.enroll_new_course"));

  // Redirect to the login page if the student is not logged in!
  useRedirect({
    isAuthorized: userData,
    errorMsg: t("alerts.must_login"),
    redirectionRoute: "/login",
  });

  // Fetch Student's All Available Courses
  useEffect(() => {
    fetch("/data/stu_all_available_courses.json")
      .then(res => res.json())
      .then(data => setAllAvailableCourses(data));
  }, []);

  const optionsArr = lang == "en" ? ["All Courses", "Enrolled", "Not Enrolled"] : ["كل المقررات", "المواد المسجلة بالفعل", "المواد الغير مسجلة"];
  const tableAttributesArr = t("tables_attributes.all_available_courses_table", { returnObjects: true });

  const numOfEnrolledCourses = allAvailableCourses.filter(course => course.is_selected).length;
  const totalCreditHours = allAvailableCourses
    .filter(course => course.is_selected)
    .reduce((sum, course) => sum + course.credit_hours, 0);

  const stuAllowedCreditHours = userData.allowe_credit_hours;

  if (userData && allAvailableCourses)
    return (
      <main className="dashboard-page">
        <Sidebar />

        <section className="side-container">
          <PageMainHeading pageTitle={t("headings_and_titles.enroll_new_course_heading")} searchValue={searchValue} setSearchValue={setSearchValue}
            optionsArr={optionsArr} sortValue={sortValue} setSortValue={setSortValue} />

          <div className="flex-space-between" style={{ flexWrap: "wrap", gap: "10px 30px", marginBottom: "50px" }}>
            <h4>{t("text.num_of_enrolled_courses_text")} {numOfEnrolledCourses}</h4>
            <h4>{t("text.total_credit_hours_text")} {totalCreditHours}</h4>
          </div>

          <MainTable attributesArr={tableAttributesArr}>
            {
              allAvailableCourses
                .filter(course => {
                  if (sortValue == "") return course;
                  else if (sortValue == "Enrolled" || sortValue == "المواد المسجلة بالفعل") return course.is_selected;
                  else return !course.is_selected;
                })
                .filter(course => (course.course_name_en.toLowerCase().includes(searchValue) ||
                  course.course_name_ar.includes(searchValue)))
                .map(course => {
                  return (
                    <tr key={course.id}>
                      <td>
                        <Switch checked={course.is_selected} disabled={!course.is_selected && stuAllowedCreditHours <= totalCreditHours} />
                      </td>
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

export default EnrollNewCourse;