import { MetaFunction, Outlet, redirect } from "@remix-run/react";
import { COLLECTIONS, DB_NAME, mongodb } from "./../utils/db.server";

export const BOOKS_FORM_KEY = "books";

export const meta: MetaFunction = () => {
  return [
    { title: "ShareReads" },
    { name: "description", content: "Create and share lists of books" },
  ];
};

export const loader = async () => {
  try {
    const db = await mongodb.db(DB_NAME);
    const collection = await db.collection(COLLECTIONS.LISTS);
    const newList = await collection.insertOne({
      books: [],
    });

    const id = newList.insertedId.toString();

    return redirect(`/lists/edit/${id}`);
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};

export default function Index() {
  return <Outlet />;
}
