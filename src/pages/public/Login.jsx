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
import TwoHoursTimer from "../../components/TwoHoursTimer";

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
  const [numOfAttemptions, setNumOfAttemptions] = useState(
    getItem("num_of_attemptions") == null
      ? 3
      : getItem("num_of_attemptions")
  );

  // SET PAGE TITLE
  usePageTitle(t("pages.login"));

  // Redirect to the dashboard if the user is already loggedin
  useRedirect({
    isAuthorized: !userData,
    errorMsg: t("alerts.already_loggedin"),
    redirectionRoute: userData ? `/${userData.role_en}/dashboard` : "",
  });

  async function handleUserLogin(e) {
    // Prevent the default submation behaviour
    e.preventDefault();

    // Decrease the number of attemptions
    let updatedAttemptions;

    // if (numOfAttemptions > 0) {
    //   updatedAttemptions = numOfAttemptions - 1;
    //   setNumOfAttemptions(updatedAttemptions);
    //   setItem("num_of_attemptions", updatedAttemptions);
    // }

    // if (updatedAttemptions == 0) {
    //   showToastNotification("error", t("alerts.blocked_alert"), lang);
    //   return;
    // }

    // Validate Inputs
    if (isEmpty(loginData.code.trim())) {
      showToastNotification(
        "error",
        lang == "en" ? `${t("alerts.code_is_empty")} - You have ${updatedAttemptions} attemptions left!!` : `${t("alerts.code_is_empty")} - لديك ${updatedAttemptions} محاولات متبقية!! `,
        lang
      );
      return;
    }
    if (isEmpty(loginData.password.trim())) {
      showToastNotification(
        "error",
        lang == "en" ? `${t("alerts.password_is_empty")} - You have ${updatedAttemptions} attemptions left!!` : `${t("alerts.password_is_empty")} - لديك ${updatedAttemptions} محاولات متبقية!! `,
        lang
      );
      return;
    }

    // Login Authorization [TESTING!!!!!]
    const response = await login(loginData.code, loginData.password);

    if (!response.success) {
      showToastNotification(
        "error",
        lang == "en" ? `${t("alerts.code_or_password_is_wrong")} - You have ${updatedAttemptions} attemptions left!!` : `${t("alerts.code_or_password_is_wrong")} - لديك ${updatedAttemptions} محاولات متبقية!! `,
        lang
      );
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
            <button type="submit" className={numOfAttemptions == 0 ? "main-btn disabled" : "main-btn"}
              onClick={e => {
                if (numOfAttemptions == 0)
                  e.preventDefault();
                else
                  handleUserLogin(e);
              }}>
              {t("pages.login")}
            </button>
          </div>
        </form>
        <Link to="/email-verification" className="forgot-psw-link">
          {t("buttons_and_links.forgot_password_link")}
        </Link>
        {
          numOfAttemptions == 0 &&
          <div className="timer-wrapper flex-wrapper">
            <p className="user-blocked">{t("text.blocked_text")}</p>
            <TwoHoursTimer setNumOfAttemptions={setNumOfAttemptions} />
          </div>
        }
      </div>
    </main>
  );
}

export default Login;