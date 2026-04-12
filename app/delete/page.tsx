"use client";

import { useState } from "react";

import Navbar from "../components/navbar";

export default function DeletePage() {
  const [incidentEntryId, setIncidentEntryId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/deleteData/${incidentEntryId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setIncidentEntryId("");
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
          <h1 className="page-title">Delete Record</h1>
          <p className="page-text">
            This page is for removing a record from the database.
          </p>

          <div className="form-group">
            <input
              className="form-input"
              placeholder="Incident Entry ID"
              value={incidentEntryId}
              onChange={(e) => setIncidentEntryId(e.target.value)}
            />
          </div>

          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>

          <p className="warning-text">
            Please check the ID before deleting the record.
          </p>
        </div>
      </main>

      <footer className="page-footer">
        Detroit Crime Dashboard | Delete Page
      </footer>
    </div>
  );
}