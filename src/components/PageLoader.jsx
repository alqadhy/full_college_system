// COMPONENTS
import Spinner from "./Spinner";

// HOOKS
import { useTranslation } from "react-i18next";

function PageLoader() {
  const { t } = useTranslation();

  return (
    <div className="page-loader flex-center">
      <Spinner />
      <h3 className="loading-title">{t("headings_and_titles.page_loader_heading")}</h3>
    </div>
  );
}

export default PageLoader;