'use client';

import React, { useEffect, useState } from 'react';
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
      <Search
        listId={listId}
        selectedItems={googleBookIds}
        setSelectedItems={setGoogleBookIds}
      />
      {googleBooks.length > 0 ? (
        <ul className="mt-3">
          {Array.from(googleBooks).map((googleBook: any) => (
            <li key={googleBook.id}>
              <img
                className="ml-2 inline-block h-32 rounded"
                src={googleBook.volumeInfo.imageLinks.smallThumbnail}
                alt=""
              />
              <span className="ml-2 font-medium">
                {googleBook.volumeInfo.title}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-sm mt-16">
          Nothing here yet.
          <br />
          Add some books!
        </div>
      )}
    </>
  );
}

export default List;
