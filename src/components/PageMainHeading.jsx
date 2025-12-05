// COMPONETNS
import MainHeading from "./MainHeading";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";

function PageMainHeading({ pageTitle, showSearchBar = true, searchValue, setSearchValue,
  showSortBar = true, optionsArr, sortValue, setSortValue, children }) {
  return (
    <div className="main-heading-wrapper flex-space-between">
      <MainHeading title={pageTitle} />

      <div className="flex-wrapper" style={{ flexWrap: "wrap" }}>
        {showSearchBar && <SearchBar value={searchValue} setSearchValueFn={setSearchValue} />}
        {showSortBar && <SortBar optionsArr={optionsArr} value={sortValue} setSortValueFn={setSortValue} />}
        {children}
      </div>
    </div>
  );
}

export default PageMainHeading;