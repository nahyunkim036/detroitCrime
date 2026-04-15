"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function AddIncidentPage() {
  const [showOptional, setShowOptional] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [lastSubmitted, setLastSubmitted] = useState<Record<string, string | number> | null>(null);

  const [formData, setFormData] = useState({
    incident_entry_id: "",
    case_id: "",
    crime_id: "",
    report_number: "",
    offense_type_id: "",
    location_id: "",
    status_id: "",
    scout_car_area: "",
    police_precinct: "",
    incident_occurred_at: "",
    incident_time: "",
    incident_year: "",
    incident_hour_of_day: "",
    incident_day_of_week: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.incident_entry_id.trim()) {
      alert("Incident Entry ID is required.");
      return;
    }

    const payload: Record<string, string | number> = Object.fromEntries(
      Object.entries(formData).filter(([, value]) => value !== "")
    );

    if (payload.offense_type_id) payload.offense_type_id = Number(payload.offense_type_id);
    if (payload.location_id) payload.location_id = Number(payload.location_id);
    if (payload.status_id) payload.status_id = Number(payload.status_id);
    if (payload.incident_year) payload.incident_year = Number(payload.incident_year);
    if (payload.incident_hour_of_day) payload.incident_hour_of_day = Number(payload.incident_hour_of_day);
    if (payload.incident_day_of_week) payload.incident_day_of_week = Number(payload.incident_day_of_week);

    try {
      const response = await fetch("http://127.0.0.1:5000/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to add incident.");
        return;
      }

      setSuccessMessage(data.message || "Incident added successfully.");
      setLastSubmitted(payload);

      setFormData({
        incident_entry_id: "",
        case_id: "",
        crime_id: "",
        report_number: "",
        offense_type_id: "",
        location_id: "",
        status_id: "",
        scout_car_area: "",
        police_precinct: "",
        incident_occurred_at: "",
        incident_time: "",
        incident_year: "",
        incident_hour_of_day: "",
        incident_day_of_week: "",
      });

      setShowOptional(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Add Incident</h1>
          <p className="page-text">
            Only <strong>Incident Entry ID</strong> is required. All other fields are optional.
          </p>

          <div className="search-section">
            <form onSubmit={handleSubmit} className="form-group">
              <input
                name="incident_entry_id"
                type="text"
                value={formData.incident_entry_id}
                onChange={handleChange}
                className="form-input"
                placeholder="Incident Entry ID *"
                required
              />

              <button
                type="button"
                className="main-button"
                onClick={() => setShowOptional((prev) => !prev)}
              >
                {showOptional ? "Hide Optional Fields" : "Show Optional Fields"}
              </button>

              {showOptional && (
                <div className="two-column">
                  <input name="case_id" type="text" value={formData.case_id} onChange={handleChange} className="form-input" placeholder="Case ID" />
                  <input name="crime_id" type="text" value={formData.crime_id} onChange={handleChange} className="form-input" placeholder="Crime ID" />
                  <input name="report_number" type="text" value={formData.report_number} onChange={handleChange} className="form-input" placeholder="Report Number" />
                  <input name="offense_type_id" type="number" value={formData.offense_type_id} onChange={handleChange} className="form-input" placeholder="Offense Type ID" />
                  <input name="location_id" type="number" value={formData.location_id} onChange={handleChange} className="form-input" placeholder="Location ID" />
                  <input name="status_id" type="number" value={formData.status_id} onChange={handleChange} className="form-input" placeholder="Status ID" />
                  <input name="scout_car_area" type="text" value={formData.scout_car_area} onChange={handleChange} className="form-input" placeholder="Scout Car Area" />
                  <input name="police_precinct" type="text" value={formData.police_precinct} onChange={handleChange} className="form-input" placeholder="Police Precinct" />
                  <input name="incident_occurred_at" type="datetime-local" value={formData.incident_occurred_at} onChange={handleChange} className="form-input" />
                  <input name="incident_time" type="text" value={formData.incident_time} onChange={handleChange} className="form-input" placeholder="Incident Time" />
                  <input name="incident_year" type="number" value={formData.incident_year} onChange={handleChange} className="form-input" placeholder="Incident Year" />
                  <input name="incident_hour_of_day" type="number" value={formData.incident_hour_of_day} onChange={handleChange} className="form-input" placeholder="Incident Hour of Day" />
                </div>
              )}

              {showOptional && (
                <input
                  name="incident_day_of_week"
                  type="number"
                  value={formData.incident_day_of_week}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Incident Day of Week"
                />
              )}

              <button type="submit" className="main-button">
                Add Incident
              </button>
            </form>
          </div>

          <div className="results-section">
            {lastSubmitted ? (
              <>
                <h2 className="section-title">Latest Submission</h2>
                <p className="page-text" style={{ marginBottom: "12px" }}>
                  {successMessage}
                </p>
                <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                  {JSON.stringify(lastSubmitted, null, 2)}
                </pre>
              </>
            ) : (
              <div className="empty-results">
                No incidents submitted yet. Fill out the form above and click Add Incident.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}