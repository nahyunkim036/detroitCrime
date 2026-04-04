"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white shadow-inner mt-10">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-6 flex flex-col items-center gap-4 text-sm text-gray-700">
        
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/" className="hover:text-cyan-600 transition">
            Home
          </Link>
          <Link href="/search" className="hover:text-cyan-600 transition">
            Search
          </Link>
          <Link href="/map" className="hover:text-cyan-600 transition">
            Map
          </Link>
          <Link href="/dashboard" className="hover:text-cyan-600 transition">
            Dashboard
          </Link>
          <Link href="/documentation" className="hover:text-cyan-600 transition">
            Documentation
          </Link>
        </div>

        <div className="w-full h-px bg-gray-200" />

        <div className="text-center">
          <p className="font-semibold">Detroit Crime DBMS</p>
          <p className="text-xs text-gray-500 mt-1">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>

      </div>
    </footer>
  );
}