import { create } from "zustand";

import type { Author } from "../../types/author"; 

export type NewAuthor = Pick<Author, "name" | "description" | "birthDate" | "image" >;

interface AuthorsState {
  authors: Author[];
  nextId: number;
  init: (list: Author[]) => void;     // cargar desde API una sola vez
  add: (data: NewAuthor) => void;     // crear localmente
  update: (id: number, changes: Partial<NewAuthor>) => void;
  remove: (id: number) => void;
  getById: (id: number) => Author | undefined;
}

export const useAuthors = create<AuthorsState>((set, get) => ({
  authors: [],
  nextId: 1,
  init: (list) =>
    set({
      authors: list,
      nextId: Math.max(0, ...list.map(a => a.id)) + 1,
    }),
  add: (data) =>
    set(s => ({
      authors: [...s.authors, { id: s.nextId, ...data }],
      nextId: s.nextId + 1,
    })),
  update: (id, changes) =>
    set(s => ({
      authors: s.authors.map(a => (a.id === id ? { ...a, ...changes } : a)),
    })),
  remove: (id) => set(s => ({ authors: s.authors.filter(a => a.id !== id) })),
  getById: (id) => get().authors.find(a => a.id === id),
})
);


