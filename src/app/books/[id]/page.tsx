"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBookById } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import ReviewList from "@/components/reviewList";

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

  useEffect(() => {
    getBookById(bookId)
      .then(setBook)
      .catch((e) => setError(String(e)));
  }, [bookId]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!book) return <div className="p-6">Cargando...</div>;

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Header libro */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">{book.name}</h1>
        <div className="relative w-full h-72 rounded-lg overflow-hidden shadow">
          <Image
            src={book.image}
            alt={book.name}
            fill
            className="object-cover" unoptimized
          />
        </div>
        <div className="mt-6 rounded-lg border border-gray-200 shadow-sm bg-white p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Descripción del libro
          </h2>

          <p className="text-gray-700 leading-relaxed">{book.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="font-medium text-gray-600">ISBN</span>
              <span className="text-gray-900">{book.isbn}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-gray-600">Fecha de publicación</span>
              <span className="text-gray-900">{book.publishingDate}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Reviews */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Reseñas</h2>
        <ReviewList reviews={book.reviews || []} />

        <Link
          href={`/books/${book.id}/reviews`}
          className="inline-block px-4 py-2 rounded-lg shadow bg-[var(--color-boton)] text-white hover:opacity-50 transition"
        >
          Agregar reseña
        </Link>
      </section>
    </main>
  );
}
