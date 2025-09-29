"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthors } from "@/app/store/authors"; 
import { deleteAuthor } from "@/lib/api";

export default function DeleteAuthorPage() {
  const { id } = useParams<{ id: string }>();
  const authorId = Number(id);

  const author = useAuthors((s) => s.getById(authorId));
  const router = useRouter();


  

  useEffect(() => {
    if (!author) router.replace("/authors");
  }, [author, router]);

  // Mientras redirige (o si ya no hay autor), no renders nada
  if (!author) return null;

  async function onDelete() {
    try {
      await deleteAuthor(authorId);
      useAuthors.getState().remove(authorId);  // sincroniza store local
      router.replace("/authors");
    } catch (err) {
      console.error("Error al eliminar autor:", err);
      alert("No se pudo eliminar autor");
    }
}

  return (
    <main className="mt-12 p-6 px-20 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Eliminar autor</h1>
      <p>
        ¿Seguro que quieres eliminar a <strong>{author.name}</strong>?
      </p>

      <div className="space-x-4">
        <button
          type="button"
          onClick={() => router.push(`/authors/${authorId}/edit`)}
          className="px-4 py-2 rounded-lg shadow bg-gray-200 hover:bg-gray-300"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="px-4 py-2 rounded-lg shadow bg-red-600 text-white hover:opacity-80"
        >
          Eliminar autor
        </button>
      </div>
    </main>
  );
}
