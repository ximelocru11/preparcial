"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData, todayStr } from "@/types/formTypes";
import {
  createAuthor,
  createBook,
  linkBookToAuthor,
  createPrize,
  linkPrizeToAuthor,
  createOrganization,
  getBooks,
  getOrganizations,
} from "@/lib/api";

import AuthorForm from "@/components/authorForm";
import BookForm from "@/components/bookForm";
import PrizeForm from "@/components/prizesForm";

export default function CreateAuthorPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    try {
      // Validación ISBN
      const books = await getBooks();
      if (books.some((b) => b.isbn.toLowerCase() === data.book.isbn.toLowerCase())) {
        setError("book.isbn", { type: "manual", message: "El ISBN ya existe" });
        return;
      }

      // Validación Organización
      const orgs = await getOrganizations();
      if (orgs.some((o) => o.name.toLowerCase() === data.prize.organizationName.toLowerCase())) {
        setError("prize.organizationName", { type: "manual", message: "La organización ya existe" });
        return;
      }

      // Flujo creación
      const newAuthor = await createAuthor(data.author);
      const newBook = await createBook(data.book);
      await linkBookToAuthor(newAuthor.id, newBook.id);

      const newOrg = await createOrganization({
        name: data.prize.organizationName,
        tipo: data.prize.organizationTipo,
      });

      const newPrize = await createPrize({
        ...data.prize,
        organization: newOrg,
      });

      await linkPrizeToAuthor(newPrize.id, newAuthor.id);

      router.push("/authors");
    } catch (err) {
      console.error(err);
      alert("Error creando autor con libro y premio");
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Crear Autor con Libro y Premio</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthorForm register={register} errors={errors} todayStr={todayStr} />
        <BookForm register={register} errors={errors} />
        <PrizeForm register={register} errors={errors} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg shadow bg-[var(--color-boton)] text-white disabled:opacity-50"
        >
          {isSubmitting ? "Guardando..." : "Crear Autor"}
        </button>
      </form>
    </main>
  );
}
