"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createAuthor, createBook, linkBookToAuthor, createPrize, linkPrizeToAuthor } from "@/lib/api";

// ====================
// SCHEMAS
// ====================
function todayLocalISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
const todayStr = todayLocalISO();

// Autor
const authorSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato AAAA-MM-DD")
    .refine((s) => s >= "1900-01-01", "La fecha mínima es 1900-01-01")
    .refine((s) => s <= todayStr, "No puede ser futura"),
  image: z.string().url("Debe ser una URL válida"),
});

// Libro
const bookSchema = z.object({
  name: z.string().min(2, "Título muy corto"),
  isbn: z.string().min(5, "ISBN inválido"),
  image: z.string().url("URL inválida"),
  publishingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
  description: z.string().min(10, "Descripción muy corta"),
});

// Premio
const prizeSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  description: z.string().min(5, "Descripción muy corta"),
  premiationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
  organizationName: z.string().min(2, "Organización requerida"),
  organizationTipo: z.string().min(2, "Tipo requerido"),
});

// Unir todo
const formSchema = z.object({
  author: authorSchema,
  book: bookSchema,
  prize: prizeSchema,
});

type FormData = z.infer<typeof formSchema>;

// ====================
// COMPONENTE
// ====================
export default function CreateAuthorPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // 1. Crear autor
      const newAuthor = await createAuthor(data.author);

      // 2. Crear libro y asociar
      const newBook = await createBook(data.book);
      await linkBookToAuthor(newAuthor.id, newBook.id);

      // 3. Crear premio y asociar
      const newPrize = await createPrize({
        name: data.prize.name,
        description: data.prize.description,
        premiationDate: data.prize.premiationDate,
        organization: {
          id: 0, // el back debería ignorar o generar ID
          name: data.prize.organizationName,
          tipo: data.prize.organizationTipo,
        },
      });
      await linkPrizeToAuthor(newPrize.id, newAuthor.id);

      router.push("/authors");
    } catch (err) {
      console.error(err);
      alert("Error al crear el autor con su libro y premio");
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Crear Autor con Libro y Premio</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ================== Autor ================== */}
        <section className="space-y-3 border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Datos del Autor</h2>
          <input {...register("author.name")} placeholder="Nombre" className="w-full border px-2 py-1" />
          {errors.author?.name && <p className="text-red-600">{errors.author.name.message}</p>}
          <textarea {...register("author.description")} placeholder="Descripción" className="w-full border px-2 py-1" />
          <input type="date" max={todayStr} {...register("author.birthDate")} className="w-full border px-2 py-1" />
          <input {...register("author.image")} placeholder="URL Imagen" className="w-full border px-2 py-1" />
        </section>

        {/* ================== Libro ================== */}
        <section className="space-y-3 border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Datos del Libro</h2>
          <input {...register("book.name")} placeholder="Título" className="w-full border px-2 py-1" />
          <input {...register("book.isbn")} placeholder="ISBN" className="w-full border px-2 py-1" />
          <input type="date" {...register("book.publishingDate")} className="w-full border px-2 py-1" />
          <input {...register("book.image")} placeholder="URL Imagen" className="w-full border px-2 py-1" />
          <textarea {...register("book.description")} placeholder="Descripción" className="w-full border px-2 py-1" />
        </section>

        {/* ================== Premio ================== */}
        <section className="space-y-3 border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Datos del Premio</h2>
          <input {...register("prize.name")} placeholder="Nombre del premio" className="w-full border px-2 py-1" />
          <textarea {...register("prize.description")} placeholder="Descripción" className="w-full border px-2 py-1" />
          <input type="date" {...register("prize.premiationDate")} className="w-full border px-2 py-1" />
          <input {...register("prize.organizationName")} placeholder="Nombre de organización" className="w-full border px-2 py-1" />
          <input {...register("prize.organizationTipo")} placeholder="Tipo (PUBLICA/PRIVADA...)" className="w-full border px-2 py-1" />
        </section>

        {/* Botón */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {isSubmitting ? "Guardando..." : "Crear Autor"}
        </button>
      </form>
    </main>
  );
}
