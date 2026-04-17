import Link from "next/link";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  const quickLinks = [
    { title: "Search Records", description: "Find crime records", href: "/search" },
    { title: "Crime Map", description: "View crime locations", href: "/map" },
    { title: "Dashboard", description: "See summary data", href: "/dashboard" },
    { title: "Add Record", description: "Insert a new record", href: "/add" },
    { title: "Update Record", description: "Edit existing data", href: "/update" },
    { title: "Delete Record", description: "Remove a record", href: "/delete" },
  ];

  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
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
              CSC 4710 Final Project
            </p>

            <h1
              className="page-title"
              style={{
                fontSize: "42px",
                marginBottom: "14px",
              }}
            >
              Detroit Crime Dashboard
            </h1>

            <p
              className="page-text"
              style={{
                maxWidth: "620px",
                margin: "0 auto",
                fontSize: "17px",
              }}
            >
              A web-based database system for exploring, managing, and visualizing
              crime data in Detroit.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                style={{
                  display: "block",
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "20px",
                  padding: "22px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}