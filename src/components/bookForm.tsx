"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/types/formTypes";

interface BookFormProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export default function BookForm({ register, errors }: BookFormProps) {
  return (
    <section className="space-y-3 border p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Datos del Libro</h2>

      <input {...register("book.name")} placeholder="Título" className="w-full border px-2 py-1" />
      {errors.book?.name && <p className="text-red-600">{errors.book.name.message}</p>}

      <input {...register("book.isbn")} placeholder="ISBN" className="w-full border px-2 py-1" />
      {errors.book?.isbn && <p className="text-red-600">{errors.book.isbn.message}</p>}

      <input type="date" {...register("book.publishingDate")} className="w-full border px-2 py-1" />
      {errors.book?.publishingDate && (
        <p className="text-red-600">{errors.book.publishingDate.message}</p>
      )}

      <input {...register("book.image")} placeholder="URL Imagen" className="w-full border px-2 py-1" />
      {errors.book?.image && <p className="text-red-600">{errors.book.image.message}</p>}

      <textarea {...register("book.description")} placeholder="Descripción" className="w-full border px-2 py-1" />
      {errors.book?.description && <p className="text-red-600">{errors.book.description.message}</p>}
    </section>
  );
}
