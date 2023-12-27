import Head from 'next/head';
import Image from 'next/image';
import { Button, Theme } from '@radix-ui/themes';
import prisma from '../../prisma/db';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
        <ul>
          {list?.book_list_xref.map((item) => (
            <li key={item.id}>
              {/* <img
                  className="ml-2 inline-block h-12 rounded"
                  src={item.book.volumeInfo.imageLinks?.thumbnail}
                  alt=""
                /> */}
              <span className="ml-2">{item.books?.google_book_id}</span>
            </li>
          ))}
        </ul>
      </main>
    </Theme>
  );
}
