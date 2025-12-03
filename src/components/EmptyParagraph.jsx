// HOOKS
import { useTranslation } from "react-i18next";

function EmptyParagraph() {
  const { t } = useTranslation();

  return <p className="empty-paragraph">{t("text.empty_paragraph_text")}</p>;
}

export default EmptyParagraph;