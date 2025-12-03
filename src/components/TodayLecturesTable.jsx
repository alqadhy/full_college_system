// HOOKS
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import PageLoader from "./PageLoader";

// CONTEXTS
import { langContext } from "../contexts/languageContext";

// COMPONENTS
import EmptyParagraph from "./EmptyParagraph";

function TodayLecturesTable() {
  const { t } = useTranslation();
  const [stuSchedule, setStuSchedule] = useState({});
  const { lang } = useContext(langContext);

  useEffect(() => {
    // Student Schedule
    fetch("/data/stu_weekly_schedule.json")
      .then(res => res.json())
      .then(data => setStuSchedule(data));
  }, []);

  const tableCols = t("tables_attributes.today_schedule_table", { returnObjects: true });

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

  if (stuSchedule[todayName])
    return (
      <div className="responsive-table" style={{ gridColumnEnd: "span 3" }}>
        <h4 className="sub-title">{t("headings_and_titles.today_schedule_title")}</h4>
        <table className="stu-today-schedule-table">
          {/* TABLE HEADER */}
          <thead>
            <tr>
              {
                Object.keys(tableCols).map(key => {
                  return (
                    <td key={key}>{tableCols[key]}</td>
                  );
                })
              }
            </tr>
          </thead>
          {/* TABLE BODY */}
          {
            stuSchedule[todayName].length != 0
              ? <tbody>
                {
                  stuSchedule &&
                  stuSchedule[todayName].map(lec => {
                    return (
                      <tr key={lec.id}>
                        <td>{lec.time}</td>
                        <td>{lang == "en" ? lec.course_en : lec.course_ar}</td>
                        <td>{lang == "en" ? lec.instructor_en : lec.instructor_ar}</td>
                        <td>{lang == "en" ? lec.location_en : lec.location_ar}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
              : <EmptyParagraph />
          }
        </table>
      </div>
    );
  else
    return <PageLoader />
}

export default TodayLecturesTable;