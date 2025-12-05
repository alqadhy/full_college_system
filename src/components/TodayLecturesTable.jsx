// HOOKS
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import PageLoader from "./PageLoader";

// CONTEXTS
import { langContext } from "../contexts/languageContext";

// COMPONENTS
import EmptyParagraph from "./EmptyParagraph";

function TodayLecturesTable({ stuSchedule, todayName }) {
  const { t } = useTranslation();
  const { lang } = useContext(langContext);

  const tableAttributes = t("tables_attributes.today_schedule_table", { returnObjects: true });

  return (
    <div className="responsive-table" style={{ gridColumnEnd: "span 3" }}>
      <h4 className="sub-title">{t("headings_and_titles.today_schedule_title")}</h4>
      <table className="stu-today-schedule-table">
        {/* TABLE HEADER */}
        <thead>
          <tr>
            {
              Object.keys(tableAttributes).map(key => {
                return (
                  <td key={key}>{tableAttributes[key]}</td>
                );
              })
            }
          </tr>
        </thead>
        {/* TABLE BODY */}
        {
          stuSchedule[todayName].filter(lec => lec.id).length != 0
            ? <tbody>
              {
                stuSchedule &&
                stuSchedule[todayName].map(lec => {
                  return (
                    <tr key={lec.id}>
                      <td className="force-ltr">{lec.time}</td>
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
}

export default TodayLecturesTable;