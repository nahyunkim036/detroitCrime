"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { API_BASE_URL } from "../lib/api";

type DashboardData = {
  totalRecords: string;
  totalOffenseTypes: string;
  totalLocations: string;
  totalStatuses: string;
  mappedRecords: string;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dashboardData`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-text">
            This page shows simple summary information from the database.
          </p>

          {loading ? (
            <p className="page-text">Loading dashboard data...</p>
          ) : data ? (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                  marginTop: "20px",
                }}
              >
                <div className="info-box" style={{ marginTop: 0 }}>
                  <h2 className="section-title">Total Records</h2>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {data.totalRecords}
                  </p>
                </div>

                <div className="info-box" style={{ marginTop: 0 }}>
                  <h2 className="section-title">Offense Types</h2>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {data.totalOffenseTypes}
                  </p>
                </div>

                <div className="info-box" style={{ marginTop: 0 }}>
                  <h2 className="section-title">Locations</h2>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {data.totalLocations}
                  </p>
                </div>

                <div className="info-box" style={{ marginTop: 0 }}>
                  <h2 className="section-title">Case Status Types</h2>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {data.totalStatuses}
                  </p>
                </div>

                <div className="info-box" style={{ marginTop: 0 }}>
                  <h2 className="section-title">Mapped Records</h2>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {data.mappedRecords}
                  </p>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "24px", marginTop: "28px" }}>
                <h2 className="section-title">Summary</h2>
                <p className="page-text" style={{ marginBottom: 0 }}>
                  The dashboard provides a quick overview of the Detroit Crime Dashboard
                  database, including the total number of records, offense types, locations,
                  status categories, and records with valid map coordinates.
                </p>
              </div>
            </>
          ) : (
            <p className="warning-text">Unable to load dashboard data.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}