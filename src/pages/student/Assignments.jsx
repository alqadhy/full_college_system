// COMPONENTS
import PageLoader from "../../components/PageLoader";
import Sidebar from "../../components/Sidebar";
import MainHeading from "../../components/MainHeading";
import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import MainTable from "../../components/MainTable";

// HOOKS
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// ICONS
import { FaFileAlt } from "react-icons/fa";

// CONTEXTS
import { langContext } from "../../contexts/languageContext";
import { userDataContext } from './../../contexts/userDataContext';

// UTILS FUNCTIONS
import { setPageTitle, showToastNotification } from "../../utils";

function Assignments() {
  const { t } = useTranslation();
  const [allAssignments, setAllAssignments] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const { lang } = useContext(langContext);
  const { userData } = useContext(userDataContext);
  const navigateTo = useNavigate();

  // SET PAGE TITLE
  useEffect(() => {
    setPageTitle(t("university_data.short_name") + " - " + t("pages.assignments"));
  }, [lang]);

  // Redirect to the dashboard if the user is not logged in
  useEffect(() => {
    if (!userData) {
      navigateTo("/login");
      showToastNotification("error", t("alerts.must_login"));
    }
  }, []);

  // Fetch All Student's Assignments
  useEffect(() => {
    fetch("/data/stu_all_assignments.json")
      .then(res => res.json())
      .then(data => setAllAssignments(data));
  }
  ), [];

  const optionsArr = new Set([lang == "en" ? "All Subjects" : "كل المواد", ...allAssignments.map(assignment => lang == "en" ? assignment.subject_en : assignment.subject_ar)]);
  const tableAttributesArr = t("tables_attributes.assignments_table", { returnObjects: true });

  if (allAssignments)
    return (
      <main className="dashboard-page">
        <Sidebar />

        <section className="side-container">
          <div className="main-heading-wrapper flex-space-between">
            <MainHeading title={t("headings_and_titles.all_assignments_heading")} />
            <div className="flex-wrapper" style={{ flexWrap: "wrap" }}>
              <SearchBar value={searchValue} setSearchValueFn={setSearchValue} />
              <SortBar optionsArr={optionsArr} value={sortValue} setSortValueFn={setSortValue} />
            </div>
          </div>

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
                      <td><span className="status">{lang == "en" ? assignment.status_en : assignment.status_ar}</span></td>
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