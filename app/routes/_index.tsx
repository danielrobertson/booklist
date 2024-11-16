import type { MetaFunction } from "@remix-run/cloudflare";
import { BookSearchWithListComponent } from "~/components/book-search-with-list";

export const meta: MetaFunction = () => {
  return [
    { title: "Book Search" },
    { name: "description", content: "Search for books using Google Books API" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen justify-center">
      <div className="flex flex-col items-center gap-16 w-full max-w-3xl px-4">
        <header className="flex flex-col items-center gap-9"></header>
        <main className="w-full">
          <BookSearchWithListComponent />
        </main>
      </div>
    </div>
  );
}
