"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/types/formTypes";

interface AuthorFormProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  todayStr: string;
}

export default function AuthorForm({ register, errors, todayStr }: AuthorFormProps) {
  return (
    <section className="space-y-3 border p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Datos del Autor</h2>

      <input
        {...register("author.name")}
        placeholder="Nombre"
        className="w-full border px-2 py-1"
      />
      {errors.author?.name && <p className="text-red-600">{errors.author.name.message}</p>}

      <textarea
        {...register("author.description")}
        placeholder="Descripción"
        className="w-full border px-2 py-1"
      />
      {errors.author?.description && (
        <p className="text-red-600">{errors.author.description.message}</p>
      )}

      <input
        type="date"
        max={todayStr}
        {...register("author.birthDate")}
        className="w-full border px-2 py-1"
      />
      {errors.author?.birthDate && (
        <p className="text-red-600">{errors.author.birthDate.message}</p>
      )}

      <input
        {...register("author.image")}
        placeholder="URL Imagen"
        className="w-full border px-2 py-1"
      />
      {errors.author?.image && (
        <p className="text-red-600">{errors.author.image.message}</p>
      )}
    </section>
  );
}
