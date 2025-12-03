// COMPONENTS
import MainHeading from "../MainHeading";

// HOOKS
import { useTranslation } from "react-i18next";

// ICONS
import { FaCode } from "react-icons/fa";
import { MdOutlineSettingsSystemDaydream } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa6";
import { GiEgyptianTemple } from "react-icons/gi";

function DepartmentBox({ icon, title }) {
  return (
    <div className="dp-box card move-to-top-hover">
      {icon}
      <h3 className="font-medium limited-lines" style={{ "--n": 1 }} title={title}>
        {title}
      </h3>
    </div>
  );
}

function Departments() {
  const { t } = useTranslation();

  return (
    <section className="departments">
      <div className="container">
        <MainHeading title={t("headings_and_titles.departments_heading")} />

        <div className="grid-4">
          <DepartmentBox icon={<FaCode className="icon" />} title={t("departments.computer_science")} />
          <DepartmentBox icon={<MdOutlineSettingsSystemDaydream className="icon" />} title={t("departments.information_systems")} />
          <DepartmentBox icon={<FaBriefcase className="icon" />} title={t("departments.business_management")} />
          <DepartmentBox icon={<GiEgyptianTemple className="icon" />} title={t("departments.tourism")} />
        </div>
      </div>
    </section>
  );
}

export default Departments;