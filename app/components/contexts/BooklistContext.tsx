import { createContext, useContext, useState, ReactNode } from "react";
import { BookResult } from "~/types";

type BooklistContextType = {
  bookList: BookResult[];
  setBookList: React.Dispatch<React.SetStateAction<BookResult[]>>;
};

const BooklistContext = createContext<BooklistContextType | undefined>(
  undefined
);

export function BooklistProvider({ children }: { children: ReactNode }) {
  const [bookList, setBookList] = useState<BookResult[]>([]);

  return (
    <BooklistContext.Provider value={{ bookList, setBookList }}>
      {children}
    </BooklistContext.Provider>
  );
}

export function useBooklist() {
  const context = useContext(BooklistContext);
  if (context === undefined) {
    throw new Error("useBooklist must be used within a BooklistProvider");
  }
  return context;
}
