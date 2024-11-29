import { useEffect, useState } from "react";
import { BookOpen, Check, Copy } from "lucide-react";
import { useSubmit, useActionData } from "@remix-run/react";
import copy from "copy-to-clipboard";

import BookResultCard from "./book-result-card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { BOOKS_FORM_KEY, action } from "~/routes/_index";
import { useBooklist } from "./contexts/BooklistContext";

export function StickyHeader() {
  const { bookList } = useBooklist();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const submit = useSubmit();
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData) {
      console.log("server returned with new list:", actionData);
      copyShareUrl(actionData.id);
    }
  }, [actionData]);

  const copyShareUrl = async (id: string) => {
    const url = `${window.location.origin}/lists/${id}`;

    try {
      if (
        /iPhone|iPad|iPod/.test(navigator.userAgent) &&
        /Safari/.test(navigator.userAgent)
      ) {
        await navigator.share({
          url,
        });
      } else {
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

  const submitList = async () => {
    const formData = new FormData();
    formData.append(BOOKS_FORM_KEY, JSON.stringify(bookList));

    // async post to server to create a new list and get a share url
    submit(formData, { method: "post" });
  };

  useEffect(() => {
    if (!isDialogOpen) {
      setIsCopied(false);
    }
  }, [isDialogOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex justify-between w-full">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <img src="/icon.png" alt="ShareReads" className="h-6 w-6" />
            <span className="font-bold">ShareReads</span>
          </a>
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
                <Button onClick={submitList} className="w-full mb-4">
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
        </div>
      </div>
    </header>
  );
}
