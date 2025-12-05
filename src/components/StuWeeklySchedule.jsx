// HOOKS
import { useTranslation } from "react-i18next";
import { useContext } from "react";

// CONTEXTS
import { langContext } from "../contexts/languageContext";

function StuWeeklySchedule({ stuSchedule }) {
  const { t } = useTranslation();
  const { lang } = useContext(langContext);

  return (
    <div className="responsive-table">
      <table className="weekly-schedule">
        <tbody>
          {
            Object.keys(stuSchedule).map(day => {
              return (
                <tr key={day}>
                  <td>{t(`days_of_week.${day}`)}</td>
                  {
                    stuSchedule[day].map((lec, i) => {
                      if (!lec.id) return (
                        <td key={i}>
                          <h4 className="no-lec-txt">{t("text.no_lectures_text")}</h4>
                        </td>
                      );

                      return (
                        <td key={i}>
                          <div className="lec-box" title={lang == "en" ? lec.course_en : lec.course_ar}>
                            <p className="time force-ltr">{lec.time}</p>
                            <h4>
                              {lang == "en" ? lec.location_en : lec.location_ar} - {lang == "en" ? lec.course_en : lec.course_ar}
                            </h4>
                          </div>
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default StuWeeklySchedule;