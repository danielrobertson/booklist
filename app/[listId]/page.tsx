import Head from 'next/head';
import Image from 'next/image';
import { Button, Theme } from '@radix-ui/themes';
import prisma from '../../prisma/db';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
  console.log(
    '🚀 ~ file: page.tsx:19 ~ ListPage ~ list:',
    list?.book_list_xref,
  );

  const googleBooks = await Promise.all(
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
      <header className="flex items-center justify-center px-5 py-2 mt-7">
        <Image
          className="rounded-full"
          src="/logo.png"
          alt="Book"
          width={80}
          height={80}
        />
        <h1 className="ml-1 text-2xl font-bold">Booklists</h1>
      </header>

      <main className="mt-8 mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <div className="text-xs text-zinc-500 font-semibold">
          {googleBooks.length} books
        </div>
        <ul className="mt-3">
          {Array.from(googleBooks).map((googleBook: any) => (
            <li key={googleBook.id}>
              <a
                href={googleBook.volumeInfo.infoLink}
                className="flex items-start gap-2 mb-3 bg-gray-100 rounded shadow"
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
