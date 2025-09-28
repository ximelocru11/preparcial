// app/books/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBookById, createReview } from "@/lib/api";
import Link from "next/link";

type Review = {
    name: string;
    source: string;
    description: string;
};

type Book = {
  id: number;
  name: string;
  image: string;
  description: string;
  isbn: string;
  publishingDate: string;
  reviews?: Review[];
};

export default function BookDetail() {
  const { id } = useParams() as { id: string };
  const bookId = Number(id);
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    getBookById(bookId)
      .then(setBook)
      .catch(e => setError(String(e)));
  }, [bookId]);

  async function onAddReview(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createReview(bookId, { author: "Anon", comment, rating });
      // recarga el libro (o podrías actualizar reviews en memoria)
      const updated = await getBookById(bookId);
      setBook(updated);
      setComment("");
      setRating(5);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      alert("Error creando review: " + message);
    }
  }

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!book) return <div className="p-6">Cargando...</div>;

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{book.name}</h1>
      <img src={book.image} alt={book.name} className="w-full h-72 object-cover rounded" />
      <p>{book.description}</p>
      <p className="text-sm">ISBN: {book.isbn}</p>
      <p className="text-sm">Fecha: {book.publishingDate}</p>

      <section>
        <h2 className="font-semibold">Reviews</h2>
        {book.reviews?.length ? (
          book.reviews.map((r: Review, idx: number) => (
        <div key={idx} className="border rounded p-3 my-2">
            <div className="text-sm">Comentario: {r.description}</div>
        </div>
        ))
        ) : (
          <p className="text-sm">No hay reviews todavía</p>
        )}
      </section>
      <section>
        <Link
      href={`/books/${book.id}/reviews`}
      className="px-3 py-1 rounded-lg shadow bg-[var(--color-boton)] text-white hover:opacity-80"
    >
      Agregar reseña
    </Link>
      </section>
    </main>
  );
}
