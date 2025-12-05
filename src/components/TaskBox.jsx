// COMPONENTS
import { Checkbox, IconButton } from "@mui/material";

// HOOKS
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// CONTEXTS
import { userTasksContext } from "../contexts/userTasks";

// ICONS
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function TaskBox({ taskObj }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { userTasks, setUserTasks } = useContext(userTasksContext);
  const { setItem } = useLocalStorage();
  const taskBox = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const taskContent = useRef(null);

  useEffect(() => {
    const close = () => setIsOpen(false);
    document.body.addEventListener("click", close);
    return () => document.body.removeEventListener("click", close);
  }, []);

  function handleTaskCheck(e) {
    const newTasks = userTasks.map(task => {
      if (task.id == taskObj.id) return { ...task, isChecked: e.target.checked };
      return task;
    });

    setUserTasks(newTasks);
    setItem("user_tasks", newTasks);
  }

  function handleTaskEdit() {
    setIsEditing(true);
    setTimeout(() => {
      taskContent.current.focus();
    }, 0);
  }

  function handleTaskEditSave() {
    const newTasks = userTasks.map(task => {
      if (task.id == taskObj.id) return { ...task, content: taskContent.current.innerText };
      return task;
    });

    setUserTasks(newTasks);
    setItem("user_tasks", newTasks);
  }

  function handleTaskDelete() {
    taskBox.current.classList.add("deleted");

    setTimeout(() => {
      const newTasks = userTasks.filter(task => task.id != taskObj.id);
      setUserTasks(newTasks);
      setItem("user_tasks", newTasks);
    }, 500);
  }

  return (
    <div ref={taskBox} className={taskObj.isChecked ? "task-box card flex-wrapper done" : "task-box card flex-wrapper"}>
      <Checkbox
        checked={taskObj.isChecked}
        onChange={handleTaskCheck}
        sx={{
          color: "var(--primary-color)",
          '&.Mui-checked': {
            color: "var(--primary-color)",
          }
        }}
      />

      <p ref={taskContent} contentEditable={isEditing}
        suppressContentEditableWarning={true} onBlur={handleTaskEditSave}>
        {taskObj.content}
      </p>

      <IconButton onClick={e => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
      }}>
        <BsThreeDotsVertical className="icon" />
      </IconButton>

      <div className={isOpen ? "options-list opened" : "options-list"}>
        <button className="flex-wrapper edit-btn" onClick={handleTaskEdit}>
          <FaEdit className="icon" /> {t("buttons_and_links.edit_button")}
        </button>
        <button className="flex-wrapper delete-btn" onClick={handleTaskDelete}>
          <MdDelete className="icon" /> {t("buttons_and_links.delete_button")}
        </button>
      </div>
    </div>
  );
}

export default TaskBox;