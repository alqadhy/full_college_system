// HOOKS
import { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

// CONTEXTS
import { langContext } from "../contexts/languageContext";

// UTILS Functions
import { setPageTitle } from "../utils";

function usePageTitle(pageTitle) {
  const { t } = useTranslation();
  const { lang } = useContext(langContext);

  // SET PAGE TITLE
  useEffect(() => {
    setPageTitle(t("university_data.short_name") + " - " + pageTitle);
  }, [lang]);
}

export default usePageTitle;