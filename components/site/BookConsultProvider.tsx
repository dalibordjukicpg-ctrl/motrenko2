"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { BookConsultModal } from "@/components/site/BookConsultModal";

type BookConsultContextValue = {
  openBookConsult: () => void;
  closeBookConsult: () => void;
};

const BookConsultContext = createContext<BookConsultContextValue | null>(null);

export function useBookConsult() {
  const ctx = useContext(BookConsultContext);
  if (!ctx) {
    throw new Error("useBookConsult mora biti unutar BookConsultProvider");
  }
  return ctx;
}

export function BookConsultProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openBookConsult = useCallback(() => setOpen(true), []);
  const closeBookConsult = useCallback(() => setOpen(false), []);

  return (
    <BookConsultContext.Provider value={{ openBookConsult, closeBookConsult }}>
      {children}
      <BookConsultModal open={open} onClose={closeBookConsult} />
    </BookConsultContext.Provider>
  );
}
