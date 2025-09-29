"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData } from "@/types/formTypes";

interface PrizeFormProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export default function PrizeForm({ register, errors }: PrizeFormProps) {
  return (
    <section className="space-y-3 border p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Datos del Premio</h2>

      <input {...register("prize.name")} placeholder="Nombre del premio" className="w-full border px-2 py-1" />
      {errors.prize?.name && <p className="text-red-600">{errors.prize.name.message}</p>}

      <textarea {...register("prize.description")} placeholder="Descripción" className="w-full border px-2 py-1" />
      {errors.prize?.description && <p className="text-red-600">{errors.prize.description.message}</p>}

      <input type="date" {...register("prize.premiationDate")} className="w-full border px-2 py-1" />
      {errors.prize?.premiationDate && (
        <p className="text-red-600">{errors.prize.premiationDate.message}</p>
      )}

      <input {...register("prize.organizationName")} placeholder="Nombre de organización" className="w-full border px-2 py-1" />
      {errors.prize?.organizationName && (
        <p className="text-red-600">{errors.prize.organizationName.message}</p>
      )}

      <input {...register("prize.organizationTipo")} placeholder="Tipo (PUBLICA/PRIVADA...)" className="w-full border px-2 py-1" />
      {errors.prize?.organizationTipo && (
        <p className="text-red-600">{errors.prize.organizationTipo.message}</p>
      )}
    </section>
  );
}
