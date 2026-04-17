"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";
import { API_BASE_URL } from "../lib/api";

export default function SearchPage() {
  const [incidentEntryId, setIncidentEntryId] = useState("");
  const [crimeKeyword, setCrimeKeyword] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [policePrecinct, setPolicePrecinct] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const params = new URLSearchParams();

    if (incidentEntryId) params.append("incident_entry_id", incidentEntryId);
    if (crimeKeyword) params.append("crime_keyword", crimeKeyword);
    if (neighborhood) params.append("neighborhood", neighborhood);
    if (policePrecinct) params.append("police_precinct", policePrecinct);

    const url = `${API_BASE_URL}/searchData?${params.toString()}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Search Record</h1>
          <p className="page-text">
            Search crime records using simple filters such as crime keyword,
            neighborhood, or police precinct.
          </p>

          <div className="search-section">
            <h2 className="section-title">Search Filters</h2>

            <div className="form-group">
              <input
                className="form-input"
                placeholder="Incident Entry ID"
                value={incidentEntryId}
                onChange={(e) => setIncidentEntryId(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="Crime Keyword (ex. assault, theft)"
                value={crimeKeyword}
                onChange={(e) => setCrimeKeyword(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="Neighborhood"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="Police Precinct"
                value={policePrecinct}
                onChange={(e) => setPolicePrecinct(e.target.value)}
              />
            </div>

            <button className="main-button" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="results-section">
            <h2 className="section-title">Search Results</h2>

            {results.length > 0 ? (
              <div className="results-container">
                <p className="page-text" style={{ marginBottom: "12px" }}>
                  {results.length} record(s) found.
                </p>

                {results.map((record: any) => (
                  <div key={record.incident_entry_id} className="info-box">
                    <h3 className="section-title" style={{ marginBottom: "8px" }}>
                      {record.offense_category || "Unknown Crime Type"}
                    </h3>

                    <p><strong>Description:</strong> {record.offense_description || "N/A"}</p>
                    <p><strong>Status:</strong> {record.case_status || "N/A"}</p>
                    <p><strong>Precinct:</strong> {record.police_precinct || "N/A"}</p>
                    <p><strong>Neighborhood:</strong> {record.neighborhood || "N/A"}</p>
                    <p><strong>Nearest Intersection:</strong> {record.nearest_intersection || "N/A"}</p>
                    <p><strong>Occurred At:</strong> {record.incident_occurred_at || "N/A"}</p>

                    <div style={{ marginTop: "12px", fontSize: "14px", color: "#6b7280" }}>
                      <p><strong>Incident Entry ID:</strong> {record.incident_entry_id}</p>
                      <p><strong>Case ID:</strong> {record.case_id || "N/A"}</p>
                      <p><strong>Crime ID:</strong> {record.crime_id || "N/A"}</p>
                      <p><strong>Report Number:</strong> {record.report_number || "N/A"}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-results">
                <p className="page-text">
                  No results yet. Run a search to see matching records.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}