"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthors } from "@/app/store/authors";

// Lo hice porque con new Date().toISOString().slice(0, 10) me daba la fecha en UTC
// y si estoy en una zona horaria negativa, me da el día anterior.
function todayLocalISO(): string {
  const d = new Date();                  // hora local del navegador
  const y = d.getFullYear();
  // Los meses van de 0 a 11
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;             // YYYY-MM-DD en zona local
}
const todayStr = todayLocalISO();
// Esquema Zod con validaciones
const authorSchema = z.object({
  name: z.string().trim().min(2, "Mínimo 2 caracteres"),
  description: z.string().trim().min(10, "Describe al autor (10+ caracteres)"),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato AAAA-MM-DD")
    .refine((s) => s >= "1900-01-01", "La fecha mínima es 1900-01-01")
    .refine((s) => s <= todayStr, "La fecha no puede ser futura"),
  image: z.string().url("Debe ser una URL válida"),
});

type NewAuthor = z.infer<typeof authorSchema>;

export default function CreateAuthorPage() {
  const add = useAuthors((s) => s.add);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<NewAuthor>({
    resolver: zodResolver(authorSchema),
    defaultValues: { name: "", description: "", birthDate: "", image: "" },
  });
  

  const imagePreview = watch("image");

  const onSubmit = (data: NewAuthor) => {
    add(data);                // agrega al store (id lo pone el store)
    router.push("/authors");  // vuelve al listado; NO hagas refresh
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Crear autor</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm mb-1" htmlFor="name">Nombre</label>
          <input
            id="name"
            className="w-full border rounded-lg px-3 py-2"
            {...register("name")}
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm mb-1" htmlFor="description">Descripción</label>
          <textarea
            id="description"
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
            {...register("description")}
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>

        {/* Fecha + Imagen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="birthDate">Fecha de nacimiento</label>
            <input
              id="birthDate"
              type="date"
              className="w-full border rounded-lg px-3 py-2"
              max={todayStr}
              min="1900-01-01"
              {...register("birthDate")}
            />
            {errors.birthDate && <p className="text-red-600 text-sm">{errors.birthDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="image">Imagen (URL)</label>
            <input
              id="image"
              inputMode="url"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="https://..."
              {...register("image")}
            />
            {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}
          </div>
        </div>

        {/* Preview (opcional) */}
        {imagePreview && (
          <div className="relative w-full h-40 rounded-lg overflow-hidden border">
            <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[var(--color-boton)] text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </main>
  );
}
