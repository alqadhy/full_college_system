// COMPONENTS
import PageLoader from "../../components/PageLoader";
import Sidebar from "../../components/Sidebar";
import MainHeading from "../../components/MainHeading";
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

function Marks() {
  const { t } = useTranslation();
  const [stuAllMarks, setStuAllMarks] = useState([]);
  const { lang } = useContext(langContext);
  const { userData } = useContext(userDataContext);

  // SET PAGE TITLE
  usePageTitle(t("pages.marks"));

  // Redirect to the login page if the student is not logged in!
  useRedirect({
    isAuthorized: userData,
    errorMsg: t("alerts.must_login"),
    redirectionRoute: "/login",
  });

  // Fetch Student's All Available Courses
  useEffect(() => {
    fetch("/data/stu_all_marks.json")
      .then(res => res.json())
      .then(data => setStuAllMarks(data));
  }, []);

  const tableAttributesArr = t("tables_attributes.marks_table", { returnObjects: true });

  if (userData && stuAllMarks)
    return (
      <main className="dashboard-page">
        <Sidebar />

        <section className="side-container">
          <MainHeading title={t("headings_and_titles.all_marks_heading")} />

          <div className="grid-gap" style={{ gap: "50px" }}>
            {
              Object.keys(stuAllMarks).map(keyTitle => {
                return (
                  <div className="grid-gap">
                    <h4 className="flex-space-between">
                      <span>{t("text.year_of_study_text")} {stuAllMarks[keyTitle].year}</span>
                      <span>{t("text.semester_text")} {stuAllMarks[keyTitle].semester}</span>
                    </h4>
                    <MainTable key={stuAllMarks[keyTitle].id} attributesArr={tableAttributesArr}>
                      {
                        stuAllMarks[keyTitle].courses_marks.map(course => {
                          return (
                            <tr key={course.id}>
                              <td>{lang == "en" ? course.course_name_en : course.course_name_ar}</td>
                              <td>{course.course_code}</td>
                              <td>{course.credit_hours}</td>
                              <td>{course.marks.midterm.got} / <span className="bold">{course.marks.midterm.out_of}</span></td>
                              <td>{course.marks.final.got} / <span className="bold">{course.marks.final.out_of}</span></td>
                              <td>{course.marks.total.got} / <span className="bold">{course.marks.total.out_of}</span></td>
                              <td><span className="bold">{course.grade}</span></td>
                              <td>
                                <span className={course.status_en == "Passed" ? "status success" : "status error"}>
                                  {lang == "en" ? course.status_en : course.status_ar}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      }
                    </MainTable>
                  </div>
                );
              })
            }
          </div>
        </section>
      </main >
    );
  else
    return <PageLoader />;
}

export default Marks;