import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { BookSearchWithListComponent } from "~/components/book-search-with-list";

export const meta: MetaFunction = () => {
  return [
    { title: "Book Search" },
    { name: "description", content: "Search for books using Google Books API" },
  ];
};
export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { env } = context.cloudflare;
  await env.BOOKLISTS_KV.put("hello", "world");
  const value = await env.BOOKLISTS_KV.get("hello");
  console.log("🚀 ~ loader ~ value:", value);
  return { value };
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
