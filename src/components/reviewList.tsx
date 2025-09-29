"use client";
import React from "react";

type Review = {
  name: string;
  source: string;
  description: string;
};

interface Props {
  reviews: Review[];
}

export default function ReviewList({ reviews }: Props) {
  if (!reviews.length) {
    return <p className="text-sm text-gray-500">No hay reseñas todavía</p>;
  }

  return (
    <div className="grid gap-4">
      {reviews.map((r, idx) => (
        <div
          key={idx}
          className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
        >
          <div className="flex items-start gap-3">
            {/* Avatar genérico */}
            <div className="w-10 h-10 rounded-full bg-[var(--color-boton)] text-white flex items-center justify-center font-bold">
              {r.name ? r.name.charAt(0).toUpperCase() : "A"}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">
                  {r.name || "Anónimo"}
                </p>
                {r.source && (
                  <span className="text-xs text-gray-500">{r.source}</span>
                )}
              </div>
              <p className="text-sm text-gray-700 mt-1">{r.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
