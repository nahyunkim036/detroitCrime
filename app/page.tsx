import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Detroit Crime Home</h1>
          <p className="page-text">
            This project is a web-based database application for exploring crime
            data in Detroit.
          </p>

          <div className="info-box">
            <h2 className="section-title">About Our Project</h2>
            <p className="page-text">
              Users can view crime information, manage records, and check simple
              summary data through different pages in the app.
            </p>
          </div>

          <div className="info-box">
            <h2 className="section-title">Dataset</h2>
            <p className="page-text">
              The dataset comes from the Detroit Open Data Portal.
            </p>
          </div>
        </div>
      </main>

      <footer className="page-footer">
        Detroit Crime Dashboard | CSC 4710 | Nahyun Kim, Jordan Cruz
      </footer>
    </div>
  );
}