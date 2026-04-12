import Image from "next/image";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className=" bg-custom min-h-screen flex flex-col items-center justify-start">
      <Navbar/>

      <main className="page-container">
        <div className="page-card">
          <h1 className="page-title">Add Record</h1>
          <p className="page-text">
            This page is for adding a new crime record.
          </p>

          <div className="form-group">
            <input className="form-input" placeholder="Incident Entry ID" />
            <input className="form-input" placeholder="Case ID" />
            <input className="form-input" placeholder="Offense Type ID" />
            <input className="form-input" placeholder="Location ID" />
          </div>

          <button className="main-button">Add</button>
        </div>
      </main>

    <Footer/>
    </div>
  );
}
