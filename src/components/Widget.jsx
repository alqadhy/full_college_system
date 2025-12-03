// REACT ROUTER
import { Link } from "react-router-dom";

// COMPONENTS
import EmptyParagraph from './EmptyParagraph';

function Widget({ rowsNum = 1, colsNum, title, showEmptyParagrah = false,
  showViewAllLink = false, viewAllLinkTxt = "", viewAllLinkPath = null, children }) {

  return (
    <div className="widget" style={{ gridColumnEnd: `span ${colsNum}`, gridRowEnd: `span ${rowsNum}` }}>
      <h4 className="sub-title">{title}</h4>
      {children}
      {showEmptyParagrah && <EmptyParagraph />}
      {showViewAllLink && <Link to={viewAllLinkPath} className="view-all-link">{viewAllLinkTxt}</Link>}
    </div>
  );
}

export default Widget;