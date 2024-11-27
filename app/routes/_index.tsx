import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { BookSearchWithListComponent } from "~/components/book-search-with-list";

import { nanoid } from "nanoid";

export const meta: MetaFunction = () => {
  return [
    { title: "Book lists" },
    { name: "description", content: "Search and share lists of books" },
  ];
};

export const action = async ({ context, request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const books = Object.fromEntries(formData);
  console.log("books: ", books);

  const id = nanoid();
  const { env } = context.cloudflare;
  await env.BOOKLISTS_KV.put(id, JSON.stringify(books));

  return { id };
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
