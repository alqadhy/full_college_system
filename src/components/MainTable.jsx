// COMPONENTS
import EmptyParagraph from "./EmptyParagraph";

function MainTable({ attributesArr, children }) {
  return (
    <div className="responsive-table">
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
          children.length != 0
            ? <tbody>{children}</tbody>
            : <EmptyParagraph />
        }
      </table>
    </div>
  );
}

export default MainTable;