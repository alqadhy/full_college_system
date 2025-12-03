function AssignmentBox({ icon, title, documentLink = null }) {
  return (
    <div className="row-box card flex-wrapper">
      {
        documentLink
          ? <a href={documentLink} target="_blank" title={title} className="flex-wrapper">
            {icon} <span className="content">{title}</span>
          </a>
          : <p className="flex-wrapper" title={title}>
            {icon} <span className="content"> {title}</span>
          </p>
      }
    </div>
  );
}

export default AssignmentBox;