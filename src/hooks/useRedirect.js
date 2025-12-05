// HOOKS
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// CONTEXTS
import { langContext } from "../contexts/languageContext";

// UTILS Functions
import { showToastNotification } from "../utils";

function useRedirect({
  isAuthorized = false,
  errorMsg = "",
  redirectionRoute = "/login"
}) {
  const navigateTo = useNavigate();
  const { lang } = useContext(langContext);

  // Redirect to the dashboard if the user is not authorized
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo(redirectionRoute);
      showToastNotification("error", errorMsg, lang);
    }
  }, []);
}

export default useRedirect;