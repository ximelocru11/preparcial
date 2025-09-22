"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthors } from "@/app/store/authors";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function todayLocalISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
const todayStr = todayLocalISO();

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
type FormData = z.infer<typeof authorSchema>;


export default function EditAuthorPage() {
    const { id } = useParams<{ id: string }>();
    const authorId = Number(id);

    const author = useAuthors(s => s.getById(authorId));
    const update = useAuthors(s => s.update);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(authorSchema),
        defaultValues: { name: "", description: "", birthDate: "", image: "" },
    });

    //Cuando cargo el autor, actualizo los estados
        useEffect(() => {
        if (!author) return;
        reset({
        name: author.name,
        description: author.description,
        birthDate: author.birthDate,
        image: author.image,
        });
    }, [author, reset]);

    if (!author) return <main className="p-6">Autor no encontrado</main>;

    const onSubmit = (data: FormData) => {
        update(authorId, data);   // actualiza en el store
        router.push("/authors");  // vuelve a la lista (sin refresh)
    };

    const imagePreview = watch("image");

    return (
        <main className="p-6 px-20 max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Editar autor</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nombre */}
            <div>
            <label className="block text-sm mb-1" htmlFor="name">Nombre</label>
            <input id="name" className="w-full border rounded-lg px-3 py-2" 
            {...register("name")} />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
            </div>

            {/* Descripción */}
            <div>
            <label className="block text-sm mb-1" htmlFor="description">Descripción</label>
            <textarea id="description" rows={4} className="w-full border rounded-lg px-3 py-2" 
            {...register("description")} />
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
                min="1900-01-01"
                max={todayStr}
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

            {/* Preview */}
            {imagePreview && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
            </div>
            )}

            <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg shadow bg-[var(--color-boton)] text-white disabled:opacity-50"
            >
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </button>
        </form>
        </main>
  );
}