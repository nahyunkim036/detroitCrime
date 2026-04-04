import Navbar from "../components/navbar";

export default function DashboardPage() {
  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-text">
            This page shows simple summary information from the database.
          </p>

          <div className="info-box">
            <h2 className="section-title">Summary Data</h2>
            <p className="page-text">
              This section can be used to show total records, crime types, or
              neighborhood-based information.
            </p>
          </div>

          <div className="info-box">
            <h2 className="section-title">Charts or Tables</h2>
            <p className="page-text">
              Graphs, charts, or summary tables can be added here later.
            </p>
          </div>
        </div>
      </main>

      <footer className="page-footer">
        Detroit Crime Dashboard | Dashboard Page
      </footer>
    </div>
  );
}