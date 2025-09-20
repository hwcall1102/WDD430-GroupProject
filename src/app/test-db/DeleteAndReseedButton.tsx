"use client";

import { useState, useTransition } from "react";
import { deleteAndReseedDatabase } from "./actions"; // server action in same folder

export default function DeleteAndReseedButton() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = () => {
    startTransition(async () => {
      try {
        await deleteAndReseedDatabase();
        setMessage("✅ Database has been reset & reseeded!");
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to reset database.");
      }
    });
  };

  return (
    <div className="my-4">
      <button
        onClick={handleClick}
        disabled={isPending}
        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {isPending ? "Resetting..." : "Delete & Reseed Database"}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
