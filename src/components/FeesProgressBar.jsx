// LINEAR PROGRESSBAR COMPONENT
import LinearProgress from '@mui/material/LinearProgress';

// HOOKS
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';

// CONTEXTS
import { langContext } from '../contexts/languageContext';

function FeesProgressBar({ paid_amount, total_fees }) {
  const { t } = useTranslation();
  const { lang } = useContext(langContext);

  const progressPercentage = Math.round((paid_amount / total_fees) * 100);

  return (
    <div className="progress-bar" style={{ marginTop: "30px", "--percentage": `${progressPercentage}%` }} datavalue={`${progressPercentage}%`}>
      <LinearProgress
        variant="determinate"
        value={(paid_amount / total_fees) * 100}
        sx={{
          height: 12,
          borderRadius: 8,
          backgroundColor: "#eee",
          transform: lang == "ar" ? "scaleX(-1)" : null,
          "& .MuiLinearProgress-bar": {
            backgroundColor: t("main_style_colors.primary_color"),
          },
        }}
      />
      <p className="total-fees-txt">
        {t("text.total_fees_text")} {t("university_data.used_currency")} {total_fees}
      </p>
    </div>
  );
}

export default FeesProgressBar;