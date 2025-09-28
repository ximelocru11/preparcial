import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">BookStore</h1>
        <nav>
          <Link href="/" className="px-3 hover:text-gray-300">Inicio</Link>
          <Link href="/authors" className="px-3 hover:text-gray-300">Autores</Link>
          <Link href="/create" className="px-3 hover:text-gray-300">Nuevo autor</Link>
          <Link href="/books" className="px-3 hover:text-gray-300">Libros</Link>
        </nav>
      </div>
    </header>
  );
}