"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthors } from "@/app/store/authors";
import { updateAuthor } from "@/lib/api"; 

type Props = {
  id: number;
};

export default function UpdateAuthorForm({ id }: Props) {
  const author = useAuthors((state) => state.getById(id));
  const updateStore = useAuthors((state) => state.update);

  const [name, setName] = useState(author?.name ?? "");
  const [birthDate, setBirthDate] = useState(author?.birthDate ?? "");
  const [description, setDescription] = useState(author?.description ?? "");
  const [image, setImage] = useState(author?.image ?? ""); // URL de la imagen

  const router = useRouter();

  if (!author) return <main>Autor no encontrado</main>;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const updated = await updateAuthor(id, { name, birthDate, description, image });
      updateStore(id, updated);
      router.push("/authors");
    } catch (err) {
      console.error("Error al actualizar autor:", err);
      alert("No se pudo actualizar el autor. Intenta nuevamente.");
    }
  }

  return (
    <main className="p-6 px-20 max-w-6xl mx-auto space-y-6 bg-[var(--color-fondo)]">
      <h1 className="text-2xl font-bold">Editar autor</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Fecha de Nacimiento</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Descripción</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">URL de la Imagen</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            required
          />
        </div>
        {image && (
          <div className="relative w-48 h-48 overflow-hidden rounded-lg">
            <img src={image} alt={name} className="object-cover w-full h-full" />
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded-lg shadow bg-[var(--color-boton)] text-white hover:opacity-80"
        >
          Guardar Cambios
        </button>
      </form>
    </main>
  );
}
