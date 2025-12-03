// HOOKS
import { useTranslation } from "react-i18next";

// ICONS
import { IoMdSearch } from "react-icons/io";

function SearchBar({ value, setSearchValueFn }) {
  const { t } = useTranslation();

  return (
    <div className="search-bar">
      <IoMdSearch className="icon" />
      <input type="text" placeholder={t("inputs_labels.search_input_label")}
        value={value} onChange={e => setSearchValueFn(e.target.value)} />
    </div>
  );
}

export default SearchBar;