import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/node";
import { mongodb, DB_NAME, COLLECTIONS, ObjectId } from "~/utils/db.server";

export async function action({ request, params }: ActionFunctionArgs) {
  const { listId } = params;
  const body = await request.formData();
  const bookJson = body.get("book");
  const book = JSON.parse(bookJson as string);

  switch (request.method) {
    case "PUT": {
      // update list with book
      const db = await mongodb.db(DB_NAME);
      const collection = await db.collection(COLLECTIONS.LISTS);
      const list = await collection.findOne({
        _id: new ObjectId(listId),
      });

      if (!list) {
        return json({ error: "List not found" }, { status: 404 });
      }

      list.books.push(book);
      const result = await collection.updateOne(
        { _id: new ObjectId(listId) },
        { $set: { books: list.books } }
      );

      console.log("🚀 ~ action ~ result:", result);
      return json({ success: true });
      break;
    }
    case "DELETE": {
      // remove book from list
      break;
    }
  }
}
