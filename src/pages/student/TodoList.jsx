// PAGE MAIN CSS FILE
import "../../assets/css/pages/todo-list.css";

// COMPONENTS
import PageLoader from "../../components/PageLoader";
import Sidebar from "../../components/Sidebar";
import PageMainHeading from "../../components/PageMainHeading";
import Widget from "../../components/Widget";
import TaskBox from "../../components/TaskBox";

// HOOKS
import { useTranslation } from 'react-i18next';
import { useContext, useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import useRedirect from "../../hooks/useRedirect";
import useLocalStorage from './../../hooks/useLocalStorage';

// CONTEXTS
import { langContext } from "../../contexts/languageContext";
import { userDataContext } from "../../contexts/userDataContext";
import { userTasksContext } from "../../contexts/userTasks";

// UTILS FUNCTIONS
import { showToastNotification } from "../../utils";

function TodoList() {
  const { t } = useTranslation();
  const { userData } = useContext(userDataContext);
  const { lang } = useContext(langContext);
  const { userTasks, setUserTasks } = useContext(userTasksContext);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [newTaskValue, setNewTaskValue] = useState("");
  const { setItem } = useLocalStorage();

  // SET PAGE TITLE
  usePageTitle(t("pages.to_do_list"));

  // Redirect to the login page if the student is not logged in!
  useRedirect({
    isAuthorized: userData,
    errorMsg: t("alerts.must_login"),
    redirectionRoute: "/login",
  });

  const optionsArr = lang == "en" ? ["All Tasks", "Done", "Pending"] : ["كل المهام", "المنجزة", "المعلقة"];

  function handleAddNewTask() {
    const newTask = {
      id: crypto.randomUUID(),
      content: newTaskValue,
      isChecked: false,
    };

    if (newTaskValue.trim() != "") {
      setUserTasks([...userTasks, newTask]);
      setNewTaskValue("");
      setItem("user_tasks", [...userTasks, newTask]);
    } else {
      showToastNotification("error", t("alerts.cannot_create_empty_task"), lang);
    }
  }

  if (userData)
    return (
      <main className="dashboard-page">
        <Sidebar />

        <section className="side-container is-grid">
          <PageMainHeading pageTitle={t("headings_and_titles.to_do_list_heading")}
            searchValue={searchValue} setSearchValue={setSearchValue} optionsArr={optionsArr}
            sortValue={sortValue} setSortValue={setSortValue} />

          <div className="add-new-task-field" style={{ gridColumnEnd: "span 3" }}>
            <input type="text" value={newTaskValue} onChange={e => setNewTaskValue(e.target.value)}
              placeholder={t("inputs_labels.add_new_task_input_label")} />
            <button className="main-btn" onClick={handleAddNewTask}>
              {t("buttons_and_links.add_new_task_button")}
            </button>
          </div>

          <Widget title={t("headings_and_titles.your_tasks_title")} colsNum={3}
            showEmptyParagrah={userTasks.length == 0}>
            <div className="grid-gap">
              {
                userTasks.length != 0 &&
                userTasks.map(task => <TaskBox key={task.id} taskObj={task} />)
              }
            </div>
          </Widget>
        </section>
      </main>
    );
  else return <PageLoader />;
}

export default TodoList;