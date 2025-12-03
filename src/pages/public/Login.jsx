// Login CSS FILE
import "../../assets/css/pages/login.css";

// HOOKS
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import MainHeading from "../../components/MainHeading";
import InputField from "../../components/InputField";

// CONTEXTS
import { langContext } from "../../contexts/languageContext";
import { userDataContext } from "../../contexts/userDataContext";

// UTILS FUNCTIONS
import { setPageTitle, isEmpty, showToastNotification } from "../../utils";
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

  // Toast Settings
  const position = lang == "ar" ? "top-left" : "top-right";
  const duration = 2500;

  // SET PAGE TITLE
  useEffect(() => {
    setPageTitle(t("university_data.short_name") + " - " + t("pages.login"));
  }, [lang]);

  // Redirect to the dashboard if the user is already loggedin
  useEffect(() => {
    if (userData) {
      navigateTo(`/${userData.role_en}/dashboard`);
      showToastNotification("error", t("alerts.already_loggedin"), position, duration);
    }
  }, []);

  async function handleFormSubmit(e) {
    // Prevent the default submation behaviour
    e.preventDefault();

    // Validate Inputs
    if (isEmpty(loginData.code.trim())) {
      showToastNotification("error", t("alerts.code_is_empty"), position, duration);
      return;
    }
    if (isEmpty(loginData.password.trim())) {
      showToastNotification("error", t("alerts.password_is_empty"), position, duration);
      return;
    }

    // Login Authorization [TESTING!!!!!]
    const response = await login(loginData.code, loginData.password);

    if (!response.success) {
      showToastNotification("error", t("alerts.code_or_password_is_wrong"), position, duration);
      return;
    }

    showToastNotification("success", t("alerts.login_successfully"), position, duration);

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