import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function DocumentationPage() {
  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Documentation</h1>
          <p className="page-text">
            This page gives basic information about the project.
          </p>

          <div className="info-box">
            <h2 className="section-title">Project Overview</h2>
            <p className="page-text">
              Detroit Crime Dashboard is a web-based database application for
              exploring crime data in Detroit.
            </p>
          </div>

          <div className="info-box">
            <h2 className="section-title">Team Members</h2>
            <p className="page-text">Nahyun Kim, Jordan Cruz</p>
          </div>

          <div className="info-box">
            <h2 className="section-title">Tools Used</h2>
            <p className="page-text">
              Next.js, React, Tailwind CSS, and PostgreSQL.
            </p>
          </div>

          <div className="info-box">
            <h2 className="section-title">How to Use</h2>
            <p className="page-text">
              Use the navigation bar to move between the main pages of the project.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}