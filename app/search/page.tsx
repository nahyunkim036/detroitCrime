import Image from "next/image";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className=" bg-custom min-h-screen flex flex-col items-center justify-start">
      <Navbar/>

      <main className="flex flex-col items-center text-center gap-10 max-w-2xl px-6 py-12">
        <div className="bg-white backdrop-blur-md p-8 rounded-[40px] w-full sm:w-[420px] min-h-[550px] flex flex-col justify-center relative overflow-hidden">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            search
          </h1>
        </div>
      </main>

    <Footer/>
    </div>
  );
}
