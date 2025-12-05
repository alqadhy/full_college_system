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

function Events() {
  const { t } = useTranslation();
  const [allEvents, setAllEvents] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const { lang } = useContext(langContext);
  const { userData } = useContext(userDataContext);

  // SET PAGE TITLE
  usePageTitle(t("pages.events"));

  // Redirect to the login page if the student is not logged in!
  useRedirect({
    isAuthorized: userData,
    errorMsg: t("alerts.must_login"),
    redirectionRoute: "/login",
  });

  // Fetch Student's All Events Data
  useEffect(() => {
    fetch("/data/stu_all_events.json")
      .then(res => res.json())
      .then(data => setAllEvents(data));
  }, []);

  const optionsArr = new Set([lang == "en" ? "All Types" : "كل الأنواع", ...allEvents.map(event => lang == "en" ? event.type_en : event.type_ar)]);
  const tableAttributesArr = t("tables_attributes.events_table", { returnObjects: true });

  if (userData && allEvents)
    return (
      <main className="dashboard-page">
        <Sidebar />

        <section className="side-container">
          <PageMainHeading pageTitle={t("headings_and_titles.all_events_heading")} searchValue={searchValue} setSearchValue={setSearchValue}
            optionsArr={optionsArr} sortValue={sortValue} setSortValue={setSortValue} />

          <MainTable attributesArr={tableAttributesArr}>
            {
              allEvents
                .filter(event => sortValue == "" ? event : (event.type_en == sortValue || event.type_ar == sortValue))
                .filter(event => {
                  return (event.title_en.toLowerCase().includes(searchValue) ||
                    event.title_ar.includes(searchValue));
                })
                .map(event => {
                  return (
                    <tr key={event.id}>
                      <td>{lang == "en" ? event.title_en : event.title_ar}</td>
                      <td>{lang == "en" ? event.type_en : event.type_ar}</td>
                      <td className="force-ltr">{event.date}</td>
                      <td className="force-ltr">{event.start_time}</td>
                      <td className="force-ltr">{event.end_time}</td>
                      <td>{lang == "en" ? event.location_en : event.location_ar}</td>
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

export default Events;
