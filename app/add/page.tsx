import Navbar from "../components/navbar";

export default function AddPage() {
  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Add Record</h1>
          <p className="page-text">
            This page is for adding a new crime record.
          </p>

          <div className="form-group">
            <input className="form-input" placeholder="Incident Entry ID" />
            <input className="form-input" placeholder="Case ID" />
            <input className="form-input" placeholder="Offense Type ID" />
            <input className="form-input" placeholder="Location ID" />
          </div>

          <button className="main-button">Add</button>
        </div>
      </main>

      <footer className="page-footer">
        Detroit Crime Dashboard | Add Page
      </footer>
    </div>
  );
}