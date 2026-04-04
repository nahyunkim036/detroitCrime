import Navbar from "../components/navbar";

export default function DeletePage() {
  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Delete Record</h1>
          <p className="page-text">
            This page is for removing a record from the database.
          </p>

          <div className="form-group">
            <input className="form-input" placeholder="Incident Entry ID" />
          </div>

          <button className="delete-button">Delete</button>

          <p className="warning-text">
            Please check the ID before deleting the record.
          </p>
        </div>
      </main>

      <footer className="page-footer">
        Detroit Crime Dashboard | Delete Page
      </footer>
    </div>
  );
}