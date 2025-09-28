import { Author } from "@/types/author";
import { Prize } from "@/types/author";
import { Book } from "@/types/author";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE as string;

/* =======================
   AUTORES
======================= */
export async function createAuthor(author: Omit<Author, "id">): Promise<Author> {
  const res = await fetch(`${BASE_URL}/api/authors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  });

  if (!res.ok) {
    throw new Error("Error al crear el autor");
  }

  return res.json() as Promise<Author>;
}

export async function getAuthors(): Promise<Author[]> {
  const res = await fetch(`${BASE_URL}/authors`);
  if (!res.ok) throw new Error("Error al obtener autores");
  return res.json();
}

/* =======================
   LIBROS
======================= */
export async function createBook(book: Omit<Book, "id">): Promise<Book> {
  const res = await fetch(`${BASE_URL}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error(`Error al crear libro: ${res.statusText}`);
  return res.json();
}

export async function getBooks(): Promise<Book[]> {
  const res = await fetch(`${BASE_URL}/api/books`);
  if (!res.ok) throw new Error("Error al obtener libros");
  return res.json();
}

export async function getBookById(id: number): Promise<Book> {
  const res = await fetch(`${BASE_URL}/api/books/${id}`);
  if (!res.ok) throw new Error("Error al obtener libro");
  return res.json();
}

export async function linkBookToAuthor(authorId: number, bookId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/authors/${authorId}/books/${bookId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error al asociar libro al autor");
}

/* =======================
   PREMIOS
======================= */
export async function createPrize(prize: Omit<Prize, "id">): Promise<Prize> {
  const res = await fetch(`${BASE_URL}/prizes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prize),
  });
  if (!res.ok) throw new Error(`Error al crear premio: ${res.statusText}`);
  return res.json();
}

export async function linkPrizeToAuthor(prizeId: number, authorId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/prizes/${prizeId}/author/${authorId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error al asociar premio al autor");
}

/* =======================
   REVIEWS
======================= */
export async function createReview(
  bookId: number,
  review: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const res = await fetch(`${BASE_URL}/api/books/${bookId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error("Error al crear review");
  return res.json();
}
