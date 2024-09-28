'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Search from './Search';

type Props = {
  listId: string;
};

const GOOGLE_VOLUME_API = 'https://www.googleapis.com/books/v1/volumes';

function CreateList({ listId }: Props) {
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
      setGoogleBooks(data as any);
    });
  }, [googleBookIds]);

  return (
    <>
      <div className="mt-4 text-sm font-medium">Add book</div>
      <Search
        listId={listId}
        selectedItems={googleBookIds}
        setSelectedItems={setGoogleBookIds}
      />
      {googleBooks.length > 0 ? (
        <ul className="mt-5 divide-y divide-gray-200">
          {Array.from(googleBooks).map((googleBook: any) => (
            <li className="pb-3 sm:pb-4" key={googleBook.id}>
              <div className="flex justify-between">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0">
                    <Image
                      className="mt-3 w-auto inline-block h-32 rounded"
                      src={googleBook.volumeInfo.imageLinks.smallThumbnail}
                      alt={googleBook.volumeInfo.title}
                      width={85}
                      height={128}
                    />
                  </div>
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
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  Remove
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

export default CreateList;
