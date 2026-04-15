"use client";

import dynamic from "next/dynamic";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const CrimeMap = dynamic(() => import("./CrimeMap"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div className="bg-custom page-wrapper">
      <Navbar />

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Crime Map</h1>
          <p className="page-text">
            This page shows crime locations on the map using latitude and longitude data.
          </p>

          <CrimeMap />
        </div>
      </main>

      <Footer />
    </div>
  );
}