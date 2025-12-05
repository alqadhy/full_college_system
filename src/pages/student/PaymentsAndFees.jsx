// PAGE MAIN CSS FILE
import "../../assets/css/pages/payment_and_fees.css";

// COMPONENTS
import PageLoader from "../../components/PageLoader";
import Sidebar from "../../components/Sidebar";
import PageMainHeading from './../../components/PageMainHeading';
import Widget from './../../components/Widget';
import FeesProgressBar from "../../components/FeesProgressBar";
import MainTable from './../../components/MainTable';

// HOOKS
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import useRedirect from "../../hooks/useRedirect";

// CONTEXTS
import { langContext } from "../../contexts/languageContext";
import { userDataContext } from "../../contexts/userDataContext";

// ICONS
import { FaMoneyBillWave } from "react-icons/fa";
import { MdPaid } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";

function PaymentsAndFees() {
  const { t } = useTranslation();
  const [stuFeesData, setStuFeesData] = useState({});
  const { lang } = useContext(langContext);
  const { userData } = useContext(userDataContext);

  // SET PAGE TITLE
  usePageTitle(t("pages.payments_and_fees"));

  // Redirect to the login page if the student is not logged in!
  useRedirect({
    isAuthorized: userData,
    errorMsg: t("alerts.must_login"),
    redirectionRoute: "/login",
  });

  // GET Student's fees and payment data
  useEffect(() => {
    fetch("/data/stu_fees_overview.json")
      .then(res => res.json())
      .then(data => setStuFeesData(data));
  }, []);

  const tableAttributesArr = t("tables_attributes.last_transactions_table", { returnObjects: true });

  if (stuFeesData && stuFeesData.last_transactions)
    return (
      <main className="dashboard-page">
        <Sidebar />

        <section className="side-container is-grid">
          <PageMainHeading pageTitle={t("headings_and_titles.payments_and_fees_heading")}
            showSearchBar={false} showSortBar={false}>
            <h4>{t("text.year_of_study_text")} {new Date().getFullYear()}</h4>
          </PageMainHeading>

          <Widget title={t("headings_and_titles.fees_breakdown_title")} colsNum={2}>
            <div className="grid-gap">
              <div className="fees-box">
                <div className="icon-container flex-center">
                  <FaMoneyBillWave className="icon" />
                </div>
                <div className="text">
                  <h4>{t("text.total_fees_text")}</h4>
                  <p>{stuFeesData.used_currency} {stuFeesData.total_fees}</p>
                </div>
              </div>

              <div className="fees-box">
                <div className="icon-container flex-center">
                  <MdPaid className="icon" />
                </div>
                <div className="text">
                  <h4>{t("text.paid_fees_text")}</h4>
                  <p>{stuFeesData.used_currency} {stuFeesData.paid_amount}</p>
                </div>
              </div>

              <div className="fees-box">
                <div className="icon-container flex-center">
                  <TbMoneybag className="icon" />
                </div>
                <div className="text">
                  <h4>{t("text.due_fees_text")}</h4>
                  <p>{stuFeesData.used_currency} {stuFeesData.total_fees - stuFeesData.paid_amount}</p>
                </div>
              </div>
            </div>
          </Widget>

          <Widget title={t("headings_and_titles.progress_overview_title")}>
            <FeesProgressBar paid_amount={stuFeesData.paid_amount} total_fees={stuFeesData.total_fees} />
          </Widget>

          <MainTable subTitle={<h4 className="sub-title">{t("headings_and_titles.last_transactions_title")}</h4>}
            attributesArr={tableAttributesArr}>
            {
              stuFeesData.last_transactions.map(transaction => {
                return (
                  <tr key={transaction.id}>
                    <td title={lang == "en" ? transaction.description_en : transaction.description_ar}>
                      {lang == "en" ? transaction.description_en : transaction.description_ar}
                    </td>
                    <td title={transaction.date}>{transaction.date}</td>
                    <td title={`${stuFeesData.used_currency} ${transaction.amount}`}>{stuFeesData.used_currency} {transaction.amount}</td>
                    <td title={lang == "en" ? transaction.method_en : transaction.method_ar}>
                      {lang == "en" ? transaction.method_en : transaction.method_ar}
                    </td>
                  </tr>
                );
              })
            }
          </MainTable>
        </section>
      </main >
    );
  else return <PageLoader />;
}

export default PaymentsAndFees;