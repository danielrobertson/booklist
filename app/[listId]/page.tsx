import Head from 'next/head';
import Image from 'next/image';
import { Button, Link, Theme } from '@radix-ui/themes';
import prisma from '../../prisma/db';

const GOOGLE_VOLUME_API = 'https://www.googleapis.com/books/v1/volumes';

export default async function ListPage({
  params,
}: {
  params: { listId: string };
}) {
  const listId = params.listId;

  // prisma query book_list_xref join list_id from lists table where list_id = listId
  const list = await prisma.lists.findFirst({
    where: {
      list_id: listId,
    },
    include: {
      book_list_xref: {
        include: {
          books: true,
        },
      },
    },
  });

  const googleBooks = await Promise.all(
    // @ts-ignore
    list?.book_list_xref.map(async (xref) => {
      const bookId = xref.books?.google_book_id;
      const response = await fetch(`${GOOGLE_VOLUME_API}/${bookId}`);
      const data = await response.json();
      return data;
    }),
  );

  return (
    <Theme>
      <Head>
        <title>Booklist</title>
        <link rel="icon" href="/book.ico" />
      </Head>
      <header className="max-w-lg mx-auto flex justify-between items-center py-3 px-4">
        <div className="flex items-center">
          <Image
            className="rounded-full"
            src="/logo.png"
            alt="Book"
            width={50}
            height={50}
          />
          <h1 className="ml-1 text-2xl font-bold">Booklists</h1>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1 font-medium text-zinc-500 hover:text-zinc-600"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          New
        </Link>
      </header>

      <main className="mt-8 mx-auto max-w-lg px-4">
        <div className="text-xs text-zinc-500 font-semibold">
          {googleBooks.length} {googleBooks.length > 1 ? 'books' : 'book'}
        </div>
        <ul className="mt-3">
          {Array.from(googleBooks).map((googleBook: any) => (
            <li key={googleBook.id}>
              <a
                href={googleBook.volumeInfo.previewLink}
                className="flex items-start gap-2 mb-3 bg-zinc-50 hover:bg-zinc-100 rounded shadow"
                target="_blank"
              >
                <Image
                  className="w-auto inline-block h-32 rounded"
                  src={googleBook.volumeInfo.imageLinks.smallThumbnail}
                  alt={googleBook.volumeInfo.title}
                  width={85}
                  height={128}
                />
                <div className="ml-2 mt-8 font-medium">
                  {googleBook.volumeInfo.title}
                  <div className="text-xs text-zinc-500">
                    {googleBook.volumeInfo.authors[0] || ''}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </Theme>
  );
}
