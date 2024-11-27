import React from "react";
import { Plus } from "lucide-react";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Scripts,
  useLoaderData,
  ScrollRestoration,
} from "@remix-run/react";
import { BookResult } from "~/types";
import BookResultCard from "~/components/book-result-card";

import "./../tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ context, params }: LoaderFunctionArgs) {
  const { env } = context.cloudflare;
  const booklistStr = await env.BOOKLISTS_KV.get(params.listId ?? "", "json");

  if (!booklistStr || booklistStr === null) {
    throw new Response("", { status: 404 });
  }

  const booklist = JSON.parse(booklistStr);
  console.log("🚀 ~ loader ~ ", booklist[0]);

  return json(booklist as BookResult[]);
}

export default function ListViewPage() {
  const booklist = useLoaderData<typeof loader>();
  console.log("🚀 ~ ListViewPage ~ data:", booklist);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen justify-center">
          <div className="flex flex-col w-full max-w-3xl px-4">
            <header className="w-full flex justify-end py-2">
              <a
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 border rounded-md px-3 py-1.5 hover:border-foreground"
              >
                <Plus className="w-4 h-4" /> Create your own list
              </a>
            </header>
            <main>
              <ul className="mt-3 space-y-2">
                {booklist.map((book) => (
                  <li
                    key={book.id}
                    className="flex justify-between items-center"
                  >
                    <BookResultCard book={book} />
                  </li>
                ))}
              </ul>
            </main>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
