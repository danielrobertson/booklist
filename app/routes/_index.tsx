import type { MetaFunction } from "@remix-run/cloudflare";
import { useState } from "react";
import { SearchInput } from "~/components/search-input";

interface BookResult {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate?: string;
  };
}

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
      // TODO: add KV caching layer here
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
              <div
                key={book.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {book.volumeInfo.imageLinks?.thumbnail && (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                      className="w-24 h-32 object-cover rounded"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold">
                      {book.volumeInfo.title}
                    </h2>
                    {book.volumeInfo.authors && (
                      <p className="text-gray-600">
                        {book.volumeInfo.authors.join(", ")}
                      </p>
                    )}
                    {book.volumeInfo.publishedDate && (
                      <p className="text-gray-500 text-sm">
                        Published: {book.volumeInfo.publishedDate}
                      </p>
                    )}
                    {book.volumeInfo.description && (
                      <p className="text-gray-700 mt-2 line-clamp-2">
                        {book.volumeInfo.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
