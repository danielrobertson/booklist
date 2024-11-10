import type { MetaFunction } from "@remix-run/cloudflare";
import { useState } from "react";
import BookResultCard from "~/components/book-result-card";
import { SearchInput } from "~/components/search-input";
import { BookResult } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Book Search" },
    { name: "description", content: "Search for books using Google Books API" },
  ];
};

export default function Index() {
  const [results, setResults] = useState<BookResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      // TODO: add KV caching layer here
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}`
      );
      const data = (await response.json()) as {
        error?: { message: string };
        items?: BookResult[];
      };

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to search books");
      }

      setResults(data.items || []);
      setError(null);
    } catch (error) {
      console.error("Error searching books:", error);
      setError("Failed to search books. Please try again.");
      setResults([]);
    }
  };

  return (
    <div className="flex h-screen justify-center">
      <div className="flex flex-col items-center gap-16 w-full max-w-3xl px-4">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-3xl mt-20 font-bold text-gray-800">
            Search books
          </h1>
        </header>
        <main className="w-full">
          <SearchInput onSearch={handleSearch} placeholder="Search books..." />

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          <div className="mt-8 space-y-6">
            {results.map((book) => (
              <BookResultCard key={book.id} book={book} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
