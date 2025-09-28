"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { createReview } from "@/lib/api";

export default function CreateReviewPage() {
  const { id } = useParams() as { id: string };
  const bookId = Number(id);
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createReview(bookId, { description });
      router.push(`/books/${bookId}`); // regresa al detalle del libro
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      alert("Error al crear reseña: " + message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Agregar reseña</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1" htmlFor="description">
            Comentario
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg shadow bg-[var(--color-boton)] text-white hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar reseña"}
        </button>
      </form>
    </main>
  );
}
