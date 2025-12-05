// Login CSS FILE
import "../../assets/css/pages/login.css";

// HOOKS
import { useTranslation } from "react-i18next";
import { useState, useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import useRedirect from "../../hooks/useRedirect";

// COMPONENTS
import MainHeading from "../../components/MainHeading";
import InputField from "../../components/InputField";

// CONTEXTS
import { langContext } from "../../contexts/languageContext";
import { userDataContext } from "../../contexts/userDataContext";

// UTILS FUNCTIONS
import { isEmpty, showToastNotification } from "../../utils";
import { login } from "../../services/authMock";

// REACT ROUTER
import { Link } from "react-router-dom";

function Login() {
  const { t } = useTranslation();
  const { lang } = useContext(langContext);
  const [loginData, setLoginData] = useState({ code: "", password: "" });
  const { setItem, getItem } = useLocalStorage();
  const navigateTo = useNavigate();
  const { userData, setUserData } = useContext(userDataContext);

  // SET PAGE TITLE
  usePageTitle(t("pages.login"));

  // Redirect to the dashboard if the user is already loggedin
  useRedirect({
    isAuthorized: !userData,
    errorMsg: t("alerts.already_loggedin"),
    redirectionRoute: userData ? `/${userData.role_en}/dashboard` : "",
  });

  async function handleFormSubmit(e) {
    // Prevent the default submation behaviour
    e.preventDefault();

    // Validate Inputs
    if (isEmpty(loginData.code.trim())) {
      showToastNotification("error", t("alerts.code_is_empty"), lang);
      return;
    }
    if (isEmpty(loginData.password.trim())) {
      showToastNotification("error", t("alerts.password_is_empty"), lang);
      return;
    }

    // Login Authorization [TESTING!!!!!]
    const response = await login(loginData.code, loginData.password);

    if (!response.success) {
      showToastNotification("error", t("alerts.code_or_password_is_wrong"), lang);
      return;
    }

    showToastNotification("success", t("alerts.login_successfully"), lang);

    setItem("token", response.data.token);
    setItem("user_data", response.data.user);

    setUserData(getItem("user_data"));

    navigateTo(`/${response.data.user.role_en}/dashboard`);
  }

  return (
    <main className="login-page">
      <div className="container">
        <form className="login-form">
          <MainHeading title={t("pages.login")} />

          <div className="inputs-wrapper grid-gap">
            <InputField type="text" label={t("inputs_labels.code_input_label")} value={loginData.code}
              handleChangeFn={e => { setLoginData({ ...loginData, code: e.target.value }) }} />
            <InputField type="password" label={t("inputs_labels.password_input_label")} value={loginData.password}
              handleChangeFn={e => { setLoginData({ ...loginData, password: e.target.value }) }} />
            <button type="submit" className="main-btn" onClick={e => handleFormSubmit(e)}>
              {t("pages.login")}
            </button>
          </div>
        </form>
        <Link to="/email-verification" className="forgot-psw-link">
          {t("buttons_and_links.forgot_password_link")}
        </Link>
      </div>
    </main>
  );
}

export default Login;