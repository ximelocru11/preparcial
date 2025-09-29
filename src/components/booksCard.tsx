import type { Book } from "../types/author";
import Link from "next/link";
import Image from "next/image";

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  return (
    //con el flex flex-col hago que el boton quede abajo y con el botón mt-auto pt-4 hago que se pegue abajo
    <li className=" h-full flex flex-col rounded-xl p-6 shadow hover:shadow-lg transition-shadow bg-white">
        {/*Acá la que me da el espacio total es h-80, unoptimized para que pueda de cualquier dominio*/}
        <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 overflow-hidden rounded-lg ">
            <Image src={book.image} alt={book.name} fill className="object-cover" unoptimized sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
        </div>

        <div className="space-y-2">
            <h2 className="text-2xl font-bold">{book.name}</h2>
            <h2 className="text-1xl font-bold">Publicación: {book.publishingDate}</h2>
            <p className="text-sm opacity-80 leading-relaxed line-clamp-5">{book.description}</p>
        </div>
        <div className="mt-auto pt-4 flex gap-2">
            <Link href={`/books/${book.id}`} className="px-3 py-1 rounded-lg shadow bg-[var(--color-boton)] text-white hover:opacity-80">
            Más detalle
            </Link>
      </div>
    </li>
  )
};

