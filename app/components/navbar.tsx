"use client";

import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "Map", href: "/map" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Add", href: "/add" },
    { name: "Delete", href: "/delete" },
    { name: "Update", href: "/update" },
    { name: "Documentation", href: "/documentation" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-20 items-center justify-center px-6 md:px-12 max-w-7xl">
        
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-bold text-black hover:bg-cyan-100 hover:text-cyan-950 transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
}