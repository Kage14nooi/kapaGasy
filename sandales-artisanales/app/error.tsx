"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <p className="text-xl mb-8">Une erreur est survenue côté serveur.</p>
      <p className="text-gray-700 mb-8">{error.message}</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="bg-gray-300 text-black px-6 py-3 rounded hover:bg-gray-400 transition"
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
