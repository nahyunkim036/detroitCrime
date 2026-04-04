import Navbar from "../components/navbar";

export default function UpdatePage() {
  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Update Record</h1>
          <p className="page-text">
            This page is for editing an existing crime record.
          </p>

          <div className="form-group">
            <input className="form-input" placeholder="Incident Entry ID" />

            <div className="two-column">
              <input className="form-input" placeholder="Status ID" />
              <input className="form-input" placeholder="Police Precinct" />
            </div>

            <div className="two-column">
              <input className="form-input" placeholder="Location ID" />
              <input className="form-input" placeholder="Offense Type ID" />
            </div>
          </div>

          <button className="update-button">Save Changes</button>

          <p className="note-text">
            This page shows the basic update interface for the project.
          </p>
        </div>
      </main>

      <footer className="page-footer">
        Detroit Crime Dashboard | Update Page
      </footer>
    </div>
  );
}