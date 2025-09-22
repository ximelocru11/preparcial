// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Bookstore</h1>
      <p className="mt-4 text-lg">Bienvenido a la aplicación de Bookstore!</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-12">  
      <Link href="/authors" className="px-3 py-1 rounded-lg shadow bg-[var(--color-boton)] text-white hover:opacity-80">
      Autores
      </Link>
      <Link href="/create" className="px-3 py-1 rounded-lg shadow bg-[var(--color-boton)] text-white hover:opacity-80">
      Crear autor
      </Link>
      </div>
    </main>
  );
}