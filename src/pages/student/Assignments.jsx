// COMPONENTS
import PageLoader from "../../components/PageLoader";
import Sidebar from "../../components/Sidebar";
import PageMainHeading from "../../components/PageMainHeading";
import MainTable from "../../components/MainTable";

// HOOKS
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import useRedirect from "../../hooks/useRedirect";

// ICONS
import { FaFileAlt } from "react-icons/fa";

// CONTEXTS
import { langContext } from "../../contexts/languageContext";
import { userDataContext } from './../../contexts/userDataContext';

function Assignments() {
  const { t } = useTranslation();
  const [allAssignments, setAllAssignments] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const { lang } = useContext(langContext);
  const { userData } = useContext(userDataContext);

  // SET PAGE TITLE
  usePageTitle(t("pages.assignments"));

  // Redirect to the login page if the student is not logged in!
  useRedirect({
    isAuthorized: userData,
    errorMsg: t("alerts.must_login"),
    redirectionRoute: "/login",
  });

  // Fetch All Student's Assignments
  useEffect(() => {
    fetch("/data/stu_all_assignments.json")
      .then(res => res.json())
      .then(data => setAllAssignments(data));
  }
  ), [];

  const optionsArr = new Set([lang == "en" ? "All Subjects" : "كل المواد", ...allAssignments.map(assignment => lang == "en" ? assignment.subject_en : assignment.subject_ar)]);
  const tableAttributesArr = t("tables_attributes.assignments_table", { returnObjects: true });

  if (userData && allAssignments)
    return (
      <main className="dashboard-page">
        <Sidebar />

        <section className="side-container">
          <PageMainHeading pageTitle={t("headings_and_titles.all_assignments_heading")}
            searchValue={searchValue} setSearchValue={setSearchValue}
            optionsArr={optionsArr} sortValue={sortValue} setSortValue={setSortValue} />

          <MainTable attributesArr={tableAttributesArr}>
            {
              allAssignments
                .filter(assignment => sortValue == "" ? assignment : (assignment.subject_en == sortValue || assignment.subject_ar == sortValue))
                .filter(assignment => {
                  return (assignment.title.toLowerCase().includes(searchValue) ||
                    assignment.subject_en.toLowerCase().includes(searchValue) ||
                    assignment.subject_ar.toLowerCase().includes(searchValue));
                })
                .map(assignment => {
                  return (
                    <tr key={assignment.id}>
                      <td>
                        <a href={assignment.document_link} title={assignment.title} target="_blank" className="flex-wrapper">
                          <FaFileAlt className="icon" /> {assignment.title}
                        </a>
                      </td>
                      <td>{lang == "en" ? assignment.subject_en : assignment.subject_ar}</td>
                      <td>{assignment.subject_code}</td>
                      <td>{lang == "en" ? assignment.instructor_en : assignment.instructor_ar}</td>
                      <td>{assignment.due_date}</td>
                      <td>
                        <span className={assignment.status_en == "Done" ? "status success" : "status pending"}>
                          {lang == "en" ? assignment.status_en : assignment.status_ar}
                        </span>
                      </td>
                    </tr>
                  );
                })
            }
          </MainTable>
        </section>
      </main>
    );
  else
    return <PageLoader />
}

export default Assignments; 