import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function DocumentationPage() {
  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <div style={{ marginBottom: "28px" }}>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#0f766e",
                marginBottom: "10px",
                textTransform: "uppercase",
              }}
            >
              Project Documentation
            </p>

            <h1
              className="page-title"
              style={{
                fontSize: "38px",
                marginBottom: "14px",
              }}
            >
              Detroit Crime Dashboard
            </h1>

            <p
              className="page-text"
              style={{
                maxWidth: "700px",
                marginBottom: 0,
              }}
            >
              This project is a web-based database application developed to help users
              explore, manage, and visualize crime data in Detroit through an organized
              and user-friendly interface.
            </p>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "24px", marginTop: "24px" }}>
            <h2 className="section-title">Project Overview</h2>
            <p className="page-text">
              The Detroit Crime Dashboard provides pages for searching crime records,
              viewing map-based location data, managing records through CRUD operations,
              and reviewing general project information in one system.
            </p>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "24px", marginTop: "24px" }}>
            <h2 className="section-title">Team Members</h2>
            <p className="page-text" style={{ marginBottom: "8px" }}>
              Nahyun Kim
            </p>
            <p className="page-text" style={{ marginBottom: 0 }}>
              Jordan Cruz
            </p>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "24px", marginTop: "24px" }}>
            <h2 className="section-title">Tools and Technologies</h2>
            <p className="page-text" style={{ marginBottom: "10px" }}>
              <strong>Frontend:</strong> Next.js, React, TypeScript, CSS
            </p>
            <p className="page-text" style={{ marginBottom: "10px" }}>
              <strong>Backend:</strong> Node.js, Express.js
            </p>
            <p className="page-text" style={{ marginBottom: 0 }}>
              <strong>Database:</strong> PostgreSQL
            </p>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "24px", marginTop: "24px" }}>
            <h2 className="section-title">Main Features</h2>
            <p className="page-text" style={{ marginBottom: "10px" }}>
              Search and view crime records with readable results.
            </p>
            <p className="page-text" style={{ marginBottom: "10px" }}>
              Display crime locations on an interactive map using coordinate data.
            </p>
            <p className="page-text" style={{ marginBottom: "10px" }}>
              Add, update, and delete records through connected frontend and backend pages.
            </p>
            <p className="page-text" style={{ marginBottom: 0 }}>
              Provide a dashboard area for summary information and project navigation.
            </p>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "24px", marginTop: "24px" }}>
            <h2 className="section-title">How to Use</h2>
            <p className="page-text" style={{ marginBottom: 0 }}>
              Use the navigation bar to move between the Home, Search, Map, Dashboard,
              Add, Delete, Update, and Documentation pages. Each page supports a different
              part of the Detroit Crime Dashboard workflow.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}