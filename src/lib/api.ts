import { Author, Organization } from "@/types/author";
import { Book } from "@/types/author";
import { Prize } from "@/types/author";
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
export async function updateAuthor(
  id: number,
  data: Partial<Omit<Author, "id" | "books" | "prizes">>  // ajusta los campos que permites cambiar
): Promise<Author> {
  const res = await fetch(`${BASE_URL}/api/authors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al actualizar autor: ${res.status} - ${errorText}`);
  }
  return res.json();
}

export async function deleteAuthor(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/authors/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al eliminar autor: ${res.status} - ${errorText}`);
  }
}

/* =======================
   LIBROS
======================= */

export async function getBookByIsbn(isbn: string) {
  const res = await fetch(`${BASE_URL}/api/books?isbn=${isbn}`);
  if (!res.ok) throw new Error("Error buscando libro por ISBN");
  const books: Book[] = await res.json();
  return books.filter((b: Book) => b.isbn && b.isbn === isbn);
}
export async function createBook(book: Omit<Book, "id"|"editorial" >): Promise<Book> {
  const res = await fetch(`${BASE_URL}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...book,
      editorial: { id: 1000, name: "Default Editorial" }, // obligatorio
    }),
  });
  if (!res.ok) throw new Error("Error creando libro");
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
  const res = await fetch(`${BASE_URL}/api/authors/${authorId}/books/${bookId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error asociando libro a autor");
}

/* =======================
   PREMIOS
======================= */

export async function createOrganization(org: { name: string; tipo: string }) {
  const res = await fetch(`${BASE_URL}/api/organizations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(org),
  });
  if (!res.ok) throw new Error("Error creando organización");
  return res.json();
}
export async function getOrganizations(): Promise<Organization[]> {
  const res = await fetch(`${BASE_URL}/api/organizations`);
  if (!res.ok) throw new Error("Error al obtener organizaciones");
  return res.json();
}

// Crear premio
export async function createPrize(prize: {
  name: string;
  description: string;
  premiationDate: string;
  organization: { id: number; name: string; tipo: string };
}) {
  const res = await fetch(`${BASE_URL}/api/prizes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prize),
  });
  if (!res.ok) throw new Error("Error creando premio");
  return res.json();
}

// Asociar premio a autor
export async function linkPrizeToAuthor(prizeId: number, authorId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/prizes/${prizeId}/author/${authorId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error asociando premio a autor");
}

/* =======================
   REVIEWS
======================= */
export async function createReview(bookId: number, review: { description: string }) {
  const res = await fetch(`${BASE_URL}/api/books/${bookId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (!res.ok) {
    throw new Error(`Error creando reseña: ${res.status}`);
  }

  return res.json();
}

