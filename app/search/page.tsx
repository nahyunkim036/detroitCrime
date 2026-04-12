"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";

export default function Home() {
  const [incidentEntryId, setIncidentEntryId] = useState("");
  const [caseId, setCaseId] = useState("");
  const [offenseTypeId, setOffenseTypeId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [results, setResults] = useState([]);

const handleSearch = async () => {
  const params = new URLSearchParams();

  if (incidentEntryId) params.append("incident_entry_id", incidentEntryId);
  if (caseId) params.append("case_id", caseId);
  if (offenseTypeId) params.append("offense_type_id", offenseTypeId);
  if (locationId) params.append("location_id", locationId);

  const url = `http://127.0.0.1:5000/searchData?${params.toString()}`;
  console.log("Search button clicked");
  console.log("Request URL:", url);

  try {
    const response = await fetch(url);
    console.log("Response object:", response);

    const data = await response.json();
    console.log("Returned data:", data);

    setResults(data);
  } catch (error) {
    console.error("Search failed:", error);
  }
};

  return (
    <div className="bg-custom min-h-screen flex flex-col items-center justify-start">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Search Record</h1>
          <p className="page-text">
            This page is for searching crime records.
          </p>

          <div className="form-group">
            <input
              className="form-input"
              placeholder="Incident Entry ID"
              value={incidentEntryId}
              onChange={(e) => setIncidentEntryId(e.target.value)}
            />
            <input
              className="form-input"
              placeholder="Case ID"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
            />
            <input
              className="form-input"
              placeholder="Offense Type ID"
              value={offenseTypeId}
              onChange={(e) => setOffenseTypeId(e.target.value)}
            />
            <input
              className="form-input"
              placeholder="Location ID"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            />
          </div>

          <button className="main-button" onClick={handleSearch}>
            Search
          </button>

          {results.length > 0 ? (
            <div className="results-container">
              {results.map((record: any) => (
                <div key={record.incident_entry_id} className="result-card">
                  <p><strong>Incident Entry ID:</strong> {record.incident_entry_id}</p>
                  <p><strong>Case ID:</strong> {record.case_id}</p>
                  <p><strong>Crime ID:</strong> {record.crime_id}</p>
                  <p><strong>Report Number:</strong> {record.report_number}</p>
                  <p><strong>Offense Type ID:</strong> {record.offense_type_id}</p>
                  <p><strong>Location ID:</strong> {record.location_id}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No results yet.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}