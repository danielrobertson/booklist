import Head from 'next/head';
import Image from 'next/image';
import { Link, Theme } from '@radix-ui/themes';
import prisma from '@/prisma/db';
import Header from '@/components/Header';

const GOOGLE_VOLUME_API = 'https://www.googleapis.com/books/v1/volumes';

export default async function ListPage({
  params,
}: {
  params: { listId: string };
}) {
  const listId = params.listId;

  // prisma query list_item join list_id from lists table where list_id = listId
  const list = await prisma.list.findFirst({
    where: {
      external_id: listId,
    },
    include: {
      list_item: {
        include: {
          book: true,
        },
      },
    },
  });

  const googleBooks = await Promise.all(
    (list?.list_item || []).map(async (xref) => {
      const bookId = xref.book?.google_book_id;
      const response = await fetch(`${GOOGLE_VOLUME_API}/${bookId}`);
      const data = await response.json();
      return data;
    }),
  );

  return (
    <Theme>
      <Head>
        <title>Booklists</title>
        <link rel="icon" href="/book.ico" />
      </Head>
      <Header />

      <main className="mt-8 mx-auto max-w-lg px-4">
        <h1 className="text-4xl font-extrabold">{list?.name}</h1>
        <div className="text-xs text-zinc-500 font-semibold">
          {googleBooks.length} {googleBooks.length > 1 ? 'books' : 'book'}
        </div>
        <ul className="mt-5 max-w-md divide-y divide-gray-200">
          {Array.from(googleBooks).map((googleBook: any) => (
            <li className="pb-3 sm:pb-4" key={googleBook.id}>
              <a
                href={googleBook.volumeInfo.previewLink}
                className="flex items-center space-x-4 rtl:space-x-reverse"
                target="_blank"
              >
                <Image
                  className="mt-2 w-auto inli`ne-block h-32 rounded"
                  src={googleBook.volumeInfo.imageLinks.smallThumbnail}
                  alt={googleBook.volumeInfo.title}
                  width={85}
                  height={128}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {googleBook.volumeInfo.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate ">
                    {googleBook.volumeInfo.authors
                      ? googleBook.volumeInfo.authors[0]
                      : ''}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </Theme>
  );
}
