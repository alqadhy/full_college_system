// ICONS
import { LiaAngleDownSolid } from "react-icons/lia";

// HOOKS
import { useState, useEffect } from "react";

function SortBar({ optionsArr, value, setSortValueFn }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const close = () => setIsOpen(false);
    document.body.addEventListener("click", close);
    return () => document.body.removeEventListener("click", close);
  }, []);

  const toggle = e => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }

  return (
    <div className="sort-bar" onClick={toggle}>
      <select className={isOpen ? "opened" : ""} value={value} onChange={e => setSortValueFn(e.target.value)}>
        {
          [...optionsArr].map(opt => {
            return (
              <option key={opt} value={opt.startsWith("All") || opt.startsWith("كل") ? "" : opt}>
                {opt}
              </option>
            );
          })
        }
      </select>
      <LiaAngleDownSolid className="icon" />
    </div>
  );
}

export default SortBar;