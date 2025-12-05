// COMPONENTS
import EmptyParagraph from "./EmptyParagraph";

function MainTable({ attributesArr, subTitle = null, children }) {
  return (
    <div className="responsive-table">
      {subTitle}
      <table className="main-table">
        {/* Table Header */}
        <thead>
          <tr>
            {
              Object.keys(attributesArr).map(key => <td key={key}>{attributesArr[key]}</td>)
            }
          </tr>
        </thead>
        {/* Table Body */}
        {
          children && children.length != 0
            ? <tbody>{children}</tbody>
            : <EmptyParagraph />
        }
      </table>
    </div>
  );
}

export default MainTable;