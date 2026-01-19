"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { role, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-lg font-bold text-green-700">
        NGO Donation System
      </Link>

      <div className="flex items-center gap-4">
        {role === "user" && (
          <Link href="/user" className="text-gray-600 hover:text-green-700">
            Dashboard
          </Link>
        )}

        {role === "admin" && (
          <Link href="/admin" className="text-gray-600 hover:text-green-700">
            Admin
          </Link>
        )}

        {role && (
          <button
            onClick={logout}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
