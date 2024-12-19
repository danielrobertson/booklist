import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { BookOpen, Check, Copy } from "lucide-react";
import invariant from "tiny-invariant";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { StickyHeader } from "~/components/sticky-header";
import { BookSearchWithListComponent } from "~/components/book-search-with-list";
import BookResultCard from "~/components/book-result-card";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useBooklist } from "~/components/contexts/BooklistContext";

import {
  COLLECTIONS,
  DB_NAME,
  ListModel,
  mongodb,
  ObjectId,
} from "../utils/db.server";

export const BOOKS_FORM_KEY = "books";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.listId, "Expected params.listId");

  const db = await mongodb.db(DB_NAME);
  const collection = await db.collection<ListModel>(COLLECTIONS.LISTS);
  const list = await collection.findOne({
    _id: new ObjectId(params.listId),
  });

  if (!list) {
    throw new Response("List not found", { status: 404 });
  }

  return { list: { ...list, _id: list._id.toString() } };
};

export default function EditListPage() {
  const { list } = useLoaderData<typeof loader>();
  const listId = list._id;
  // todo: handle case where id is null when DB connection fails

  const { bookList } = useBooklist();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyShareUrl = async (id: string) => {
    const url = `${window.location.origin}/lists/view/${id}`;

    try {
      // mobile browsers prefer to use the share api
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        await navigator.share({
          url,
        });
      } else {
        // desktop browsers
        copy(url);
      }
    } catch (err) {
      // User canceled or share failed
      console.error("Share failed");
    } finally {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    }
  };

  useEffect(() => {
    if (!isDialogOpen) {
      setIsCopied(false);
    }
  }, [isDialogOpen]);

  return (
    <div className="container flex h-screen justify-center">
      <div className="flex flex-col items-center gap-16 w-full max-w-3xl">
        <StickyHeader>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="relative p-2">
                Your list
                <BookOpen className="h-6 w-6" />
                {bookList.length > 0 && (
                  <span className="absolute -top-[4px] -right-[4px] bg-primary text-zinc-50 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-medium">
                    {bookList.length}
                  </span>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Your Book List</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <Button
                  onClick={() => copyShareUrl(list._id.toString())}
                  className="w-full mb-4"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Share Link
                    </>
                  )}
                </Button>
                <div className="max-h-[60vh] overflow-y-auto">
                  {bookList.length > 0 ? (
                    <ul className="space-y-2">
                      {bookList.map((book) => (
                        <li
                          key={book.id}
                          className="flex justify-between items-center"
                        >
                          <BookResultCard book={book} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-600">
                      Your book list is empty. Add some books!
                    </p>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </StickyHeader>
        <main className="max-w-3xl">
          <BookSearchWithListComponent listId={listId} />
        </main>
      </div>
    </div>
  );
}
