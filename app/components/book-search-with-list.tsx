import { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Loader2, Search, BookOpen, Plus, Copy, Check } from "lucide-react";
import { BookResult } from "~/types";
import BookResultCard from "./book-result-card";

export function BookSearchWithListComponent() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BookResult[]>([]);
  const [bookList, setBookList] = useState<BookResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    try {
      setIsLoading(true);
      // TODO: add KV caching layer here
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}`
      );
      const data = (await response.json()) as {
        error?: { message: string };
        items?: BookResult[];
      };

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to search books");
      }

      setSearchResults(data.items || []);
      setHasSearched(true);
    } catch (error) {
      console.error("Error searching books:", error);
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const addToList = (book: BookResult) => {
    if (!bookList.some((item) => item.id === book.id)) {
      setBookList((prevList) => [...prevList, book]);
    } else {
      setBookList((prevList) => prevList.filter((item) => item.id !== book.id));
    }
  };

  const generateShareUrl = () => {
    const bookIds = bookList.map((book) => book.id).join(",");
    return `${window.location.origin}/shared-list?books=${bookIds}`;
  };

  const copyShareUrl = async () => {
    const url = generateShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    if (!isDialogOpen) {
      setIsCopied(false);
    }
  }, [isDialogOpen]);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Search Books to Share</h1>
          <p className="text-gray-600">Quickly create shareable book lists</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="relative p-2">
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
              <Button onClick={copyShareUrl} className="w-full mb-4">
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
                  <p>Your book list is empty. Add some books!</p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="mb-6"
      >
        <div className="flex gap-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>

      {!hasSearched && !isLoading && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Start Your Book List</h2>
          <p className="text-gray-600 mb-4">
            Search for books above to create your shareable reading list
          </p>
          <div className="max-w-md mx-auto p-4 bg-secondary/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Tip: Try searching for your favorite author or book title to get
              started
            </p>
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <ul className="space-y-4">
            {searchResults.map((book) => (
              <li key={book.id} className="flex justify-between items-center">
                <BookResultCard
                  book={book}
                  addToList={addToList}
                  isAdded={bookList.some((item) => item.id === book.id)}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      {searchResults.length === 0 && hasSearched && !isLoading && (
        <p className="text-center text-gray-500">
          No books found. Try another search term.
        </p>
      )}
    </div>
  );
}
