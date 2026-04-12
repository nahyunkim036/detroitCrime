"use client";

import { useState } from "react";

import Navbar from "../components/navbar";

export default function AddPage() {

  const [incidentEntryId, setIncidentEntryId] = useState("");
  const [caseId, setCaseId] = useState("");
  const [crimeId, setCrimeId] = useState("");
  const [reportNumber, setReportNumber] = useState("");
  const [offenseTypeId, setOffenseTypeId] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          incident_entry_id: incidentEntryId,
          case_id: caseId,
          crime_id: crimeId,
          report_number: reportNumber,
          offense_type_id: offenseTypeId,
        }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setIncidentEntryId("");
        setCaseId("");
        setCrimeId("");
        setReportNumber("");
        setOffenseTypeId("");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };
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
              placeholder="Crime ID"
              value={crimeId}
              onChange={(e) => setCrimeId(e.target.value)}
            />
            <input
              className="form-input"
              placeholder="Report Number"
              value={reportNumber}
              onChange={(e) => setReportNumber(e.target.value)}
            />
            <input
              className="form-input"
              placeholder="Offense Type ID"
              value={offenseTypeId}
              onChange={(e) => setOffenseTypeId(e.target.value)}
            />
          </div>

          <button className="main-button" onClick={handleAdd}>
            Add
          </button>

          {message && <p className="note-text">{message}</p>}
        </div>
      </main>

      <footer className="page-footer">
        Detroit Crime Dashboard | Add Page
      </footer>
    </div>
  );
}