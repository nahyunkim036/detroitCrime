"use client";

import { useState } from "react";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { API_BASE_URL } from "../lib/api";

export default function DeletePage() {
  const [incidentEntryId, setIncidentEntryId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/deleteData/${incidentEntryId}`, 
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
          <div className="info-box">
            <h2 className="section-title">Before You Delete</h2>
            <p className="page-text">
              Make sure the Incident Entry ID is correct before removing the record.
            </p>
          </div>

          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
          

          {message ? (
            <p className="warning-text">{message}</p>
          ) : (
            <p className="warning-text">Please check the ID before deleting the record.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}