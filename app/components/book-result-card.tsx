import React from "react";
import { PlusIcon } from "lucide-react";
import { BookResult } from "~/types";
import { AddToListDrawer } from "./add-to-list-drawer";
import { Button } from "./ui/button";

type Props = {
  book: BookResult;
  addToList?: (book: BookResult) => void;
};

export default function BookResultCard({ book, addToList }: Props) {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [userLists] = React.useState([
    { id: 1, name: "Reading List" },
    { id: 2, name: "Favorites" },
  ]);

  return (
    <div
      key={book.id}
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex gap-4 w-full">
          {book.volumeInfo.imageLinks?.thumbnail && (
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              className="w-24 h-32 object-cover rounded flex-shrink-0"
            />
          )}

          <div className="min-w-0 flex-grow">
            <h2 className="text-xl font-semibold">{book.volumeInfo.title}</h2>
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
        <div className="relative w-full lg:w-auto lg:flex-shrink-0">
          {addToList && (
            <Button
              variant="outline"
              className="w-full lg:w-auto"
              onClick={() => addToList(book)}
            >
              Add to List
            </Button>
          )}
          {openDropdown === book.id && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
              <div className="py-1">
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 font-medium text-blue-500"
                  onClick={() => {
                    /* Handle create new list */
                  }}
                >
                  <PlusIcon className="inline-block w-4 h-4 mr-1" /> Create New
                  List
                </button>
                <div className="border-t">
                  {userLists.map((list) => (
                    <button
                      key={list.id}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      onClick={() => {
                        /* Handle add to list */
                        console.log(`Adding to ${list.name}`);
                      }}
                    >
                      {list.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
