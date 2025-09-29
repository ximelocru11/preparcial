import { z } from "zod";

export function todayLocalISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
export const todayStr = todayLocalISO();

const authorSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato AAAA-MM-DD")
    .refine((s) => s <= todayStr, {
      message: "La fecha de nacimiento no puede ser posterior a hoy",
    }),
  image: z.string().url("Debe ser una URL válida"),
});

const bookSchema = z.object({
  name: z.string().min(2, "Título muy corto"),
  isbn: z.string().min(5, "ISBN inválido"),
  image: z.string().url("URL inválida"),
  publishingDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD")
    .refine((s) => s <= todayStr, {
      message: "La fecha de publicación no puede ser futura",
    }),
  description: z.string().min(10, "Descripción muy corta"),
});

const prizeSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  description: z.string().min(5, "Descripción muy corta"),
  premiationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD")
    .refine((s) => s <= todayStr, {
      message: "La fecha de premiación no puede ser futura",
    }),
  organizationName: z.string().min(2, "Organización requerida"),
  organizationTipo: z.enum(["PRIVADA", "PUBLICA", "FUNDACION"], {
    message: "Debe ser PRIVADA, PUBLICA o FUNDACION",
  }),
});

export const formSchema = z.object({
  author: authorSchema,
  book: bookSchema,
  prize: prizeSchema,
});

export type FormData = z.infer<typeof formSchema>;
