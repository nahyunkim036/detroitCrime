"use client";

import { useState } from "react";
import Navbar from "../components/navbar";

export default function UpdatePage() {
  const [incidentEntryId, setIncidentEntryId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [policePrecinct, setPolicePrecinct] = useState("");
  const [locationId, setLocationId] = useState("");
  const [offenseTypeId, setOffenseTypeId] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/updateData/${incidentEntryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status_id: statusId,
            police_precinct: policePrecinct,
            location_id: locationId,
            offense_type_id: offenseTypeId,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setIncidentEntryId("");
        setStatusId("");
        setPolicePrecinct("");
        setLocationId("");
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
          <h1 className="page-title">Update Record</h1>
          <p className="page-text">
            This page is for editing an existing crime record.
          </p>

          <div className="form-group">
            <input
              className="form-input"
              placeholder="Incident Entry ID"
              value={incidentEntryId}
              onChange={(e) => setIncidentEntryId(e.target.value)}
            />

            <div className="two-column">
              <input
                className="form-input"
                placeholder="Status ID"
                value={statusId}
                onChange={(e) => setStatusId(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="Police Precinct"
                value={policePrecinct}
                onChange={(e) => setPolicePrecinct(e.target.value)}
              />
            </div>

            <div className="two-column">
              <input
                className="form-input"
                placeholder="Location ID"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="Offense Type ID"
                value={offenseTypeId}
                onChange={(e) => setOffenseTypeId(e.target.value)}
              />
            </div>
          </div>

          <button className="update-button" onClick={handleUpdate}>
            Save Changes
          </button>

          {message && <p className="note-text">{message}</p>}
        </div>
      </main>

      <footer className="page-footer">
        Detroit Crime Dashboard | Update Page
      </footer>
    </div>
  );
}