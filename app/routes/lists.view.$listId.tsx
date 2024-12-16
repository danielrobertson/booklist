import React from "react";
import { Plus } from "lucide-react";
import invariant from "tiny-invariant";

import { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Scripts,
  useLoaderData,
  ScrollRestoration,
} from "@remix-run/react";
import BookResultCard from "~/components/book-result-card";

import "./../tailwind.css";
import { StickyHeader } from "~/components/sticky-header";
import { ObjectId } from "mongodb";
import { COLLECTIONS, DB_NAME, ListModel, mongodb } from "~/utils/db.server";

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

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.listId, "Expected params.listId");

  const db = await mongodb.db(DB_NAME);
  const collection = await db.collection<ListModel>(COLLECTIONS.LISTS);
  const list = await collection.findOne({ _id: new ObjectId(params.listId) });

  return json({ list });
}

export default function ListViewPage() {
  const { list } = useLoaderData<typeof loader>();
  console.log("🚀 ~ ListViewPage ~ data:", list);

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
            <StickyHeader>
              <a
                href="/"
                className="text-sm text-secondary hover:text-foreground transition-colors flex items-center justify-center gap-1 border rounded-md px-3 py-1.5 hover:border-foreground"
              >
                <Plus className="w-4 h-4" /> Create
              </a>
            </StickyHeader>
            <main>
              <ul className="mt-3 space-y-2">
                {list?.books.map((book) => (
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
