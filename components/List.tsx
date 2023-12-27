'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Search from './Search';

type Props = {
  listId: bigint;
};

const GOOGLE_VOLUME_API = 'https://www.googleapis.com/books/v1/volumes';

function List({ listId }: Props) {
  const [googleBookIds, setGoogleBookIds] = useState<Set<string>>(new Set());
  const [googleBooks, setGoogleBooks] = useState([]);

  useEffect(() => {
    Promise.all(
      Array.from(googleBookIds).map(async (id) => {
        const response = await fetch(`${GOOGLE_VOLUME_API}/${id}`);
        const data = await response.json();
        return data;
      }),
    ).then((data) => {
      console.log(data);
      setGoogleBooks(data as any);
    });
  }, [googleBookIds]);

  return (
    <>
      <div className="mt-4 text-sm font-medium">Add books</div>
      <Search
        listId={listId}
        selectedItems={googleBookIds}
        setSelectedItems={setGoogleBookIds}
      />
      {googleBooks.length > 0 ? (
        <ul className="mt-3">
          {Array.from(googleBooks).map((googleBook: any) => (
            <li
              className="flex items-start gap-2 mb-3 bg-zinc-50 rounded shadow"
              key={googleBook.id}
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
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-sm mt-16 text-zinc-600">
          Nothing here yet.
          <br />
          Add some books!
        </div>
      )}
    </>
  );
}

export default List;
