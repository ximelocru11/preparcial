// app/books/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getBooks } from "@/lib/api";
import { Book } from "@/types/author";
import BooksCard from "../../components/books";
import Link from "next/link";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(e => setError(String(e)));
  }, []);

  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!books) return <div className="p-6">Cargando...</div>;

  return (
   <main className= "p-6 px-20 max -w-6xl mx-auto space-y-6 bg-[var(--color-fondo)]">

      <div className="mt-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Libros</h1>
        </div>
        <ul className="grid sm: grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {books.map((book) => (  
                <BooksCard key={book.id} book={book} />
            ))}
        </ul>
    </main>
  );
}
