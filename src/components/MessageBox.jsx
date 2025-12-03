// REACT ROUTER
import { Link } from "react-router-dom";

// HOOKS
import { useTranslation } from "react-i18next";

function MessageBox({ msgPath, senderPic, senderName, subject }) {
  const { t } = useTranslation();

  return (
    <Link to={msgPath} className="message-box flex-wrapper card" title={t("text.view_message")}>
      <div className="img-container">
        <img src={senderPic} alt={senderName} title={senderName} />
      </div>
      <div className="content">
        <h4>{senderName}</h4>
        <p>{subject}</p>
      </div>
    </Link>
  );
}

export default MessageBox;