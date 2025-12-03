// HOOKS
import { useTranslation } from "react-i18next";

// ICONS
import { MdManageAccounts } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaDisplay } from "react-icons/fa6";

function FeatureBox({ icon, title, desc }) {
  return (
    <div className="ft-box card move-to-top-hover">
      <div className="icon-wrapper flex-center pulse-animated">{icon}</div>
      <h3 className="font-medium limited-lines" style={{ "--n": 1 }} title={title}>
        {title}
      </h3>
      <p className="limited-lines" style={{ "--n": 3 }} title={desc}>{desc}</p>
    </div>
  );
}

function Features() {
  const { t } = useTranslation();

  return (
    <section className="features">
      <div className="container grid-4">
        <FeatureBox icon={<MdManageAccounts className="icon" />}
          title={t("features.feature_1.title")} desc={t("features.feature_1.description")} />

        <FeatureBox icon={<FaTools className="icon" />}
          title={t("features.feature_2.title")} desc={t("features.feature_2.description")} />

        <FeatureBox icon={<RiAdminFill className="icon" />}
          title={t("features.feature_3.title")} desc={t("features.feature_3.description")} />

        <FeatureBox icon={<FaDisplay className="icon" />}
          title={t("features.feature_4.title")} desc={t("features.feature_4.description")} />
      </div>
    </section>
  );
}

export default Features;