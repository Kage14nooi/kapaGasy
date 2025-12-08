"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oups ! Cette page n’existe pas.</p>
      <Link
        href="/"
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
