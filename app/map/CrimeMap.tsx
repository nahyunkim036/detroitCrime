"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import { API_BASE_URL } from "../lib/api";
type CrimePoint = {
    incident_entry_id: string;
    incident_occurred_at: string | null;
    police_precinct: string | null;
    offense_category: string | null;
    offense_description: string | null;
    latitude: number;
    longitude: number;
    neighborhood: string | null;
};

export default function CrimeMap() {
    const [points, setPoints] = useState<CrimePoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/mapData`);
                const data = await response.json();
                setPoints(data);
            } catch (error) {
                console.error("Failed to load map data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMapData();
    }, []);

    if (loading) {
        return <p className="page-text">Loading map data...</p>;
    }

    if (points.length === 0) {
        return <p className="page-text">No map data available.</p>;
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <div
                style={{
                    height: "500px",
                    width: "100%",
                    borderRadius: "18px",
                    overflow: "hidden",
                }}
            >
                <MapContainer
                    center={[42.3314, -83.0458]}
                    zoom={11}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {points.map((point) => (
                        <CircleMarker
                            key={point.incident_entry_id}
                            center={[point.latitude, point.longitude] as [number, number]}
                            radius={6}
                        >
                            <Tooltip direction="top" offset={[0, -6]} opacity={1}>
                                {point.offense_category || "Unknown Crime Type"}
                            </Tooltip>

                            <Popup>
                                <div style={{ minWidth: "220px" }}>
                                    <strong>{point.offense_category || "Unknown Crime Type"}</strong>
                                    <br />
                                    {point.offense_description || "No description"}
                                    <br />
                                    <br />
                                    <strong>Neighborhood:</strong> {point.neighborhood || "N/A"}
                                    <br />
                                    <strong>Precinct:</strong> {point.police_precinct || "N/A"}
                                    <br />
                                    <strong>Occurred At:</strong> {point.incident_occurred_at || "N/A"}
                                    <br />
                                    <strong>Incident ID:</strong> {point.incident_entry_id}
                                </div>
                            </Popup>
                        </CircleMarker>

                    ))}
                </MapContainer>
            </div>

            <p className="note-text" style={{ marginTop: "12px" }}>
                Showing {points.length} crime record(s) with valid coordinates.
            </p>
        </div>
    );
}