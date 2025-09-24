"use client";
import { useEffect, useState } from "react";
import type { Author } from "../../types/author"; 
import Link from "next/link";
import AutorCard from "../../components/autores";
import { useAuthors } from "../store/authors";

const BASE_URL = "http://127.0.0.1:8080";

export default function AuthorsPage() {

    const authors = useAuthors(s => s.authors);
    const init = useAuthors(s => s.init);
    // 1) Estados
    //const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

      // 2) Efecto: traer data una sola vez 
    useEffect(() => {
            if (authors.length > 0) return;

            setLoading(true);
            (async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/authors`, { cache: "no-store" });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = (await res.json()) as Author[];
                 init(data);// ← guardas en el store (queda para todas las rutas)
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "No se pudo cargar la lista");
            } finally {
                setLoading(false);
            }
            })();
            return () => { };
  }, [authors.length, init]);
    // 3) Render segun el estado 

    if (loading) return  <main className="p-6">Cargando…</main>;
    if (error) return <main className="p-6 text-red-600">{error}</main>;
    if (authors.length === 0) return <main>No hay autores para mostrar</main>;

    return (
        <main className= "p-6 px-20 max -w-6xl mx-auto space-y-6 bg-[var(--color-fondo)]">

        <div className="mt-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Autores</h1>
            <Link href="/create"
            className="px-4 py-2 rounded-lg shadow bg-[var(--color-boton)] text-white hover:opacity-80"
            aria-label="Crear un nuevo autor">
                + Crear autor
            </Link>
        </div>
        <ul className="grid sm: grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {authors.map((author) => (  
                <AutorCard key={author.id} author={author} />
            ))}
        </ul>

    </main>
    )
    
}


