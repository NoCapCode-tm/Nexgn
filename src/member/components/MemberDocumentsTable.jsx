import MemberDocumentsRow from "./MemberDocumentsRow";

export default function MemberDocumentsTable({ documents }) {
  return (
    <>
      <div className="member-docs-table__header">
        <span>TITLE</span>
        <span>NOTE</span>
        <span>SIGNERS</span>
        <span>SIGNED AT</span>
        <span>OWNER</span>
        <span>STATUS</span>
        <span>Action</span>
      </div>
      
      <div className="member-docs-section">
        <div className="member-docs-table">
          {documents.map((doc, idx) => (
            <MemberDocumentsRow key={idx} {...doc} />
          ))}
          {documents.length === 0 && (
            <div className="empty-state-message">
              No documents found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
