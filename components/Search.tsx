'use client';

import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { useDebounce } from 'usehooks-ts';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField, Spinner } from '@radix-ui/themes';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function useEscapeKey(callback: any) {
  useEffect(() => {
    function handleEscape(event: any) {
      if (event.key === 'Escape') {
        callback();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [callback]);
}

function useOutsideClick(ref: any, callback: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
}

// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

type Props = {
  selectedItems: Set<string>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
  listId: bigint;
};

function Search({ selectedItems, setSelectedItems, listId }: Props) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 500);
  const [isOpen, setIsOpen] = useState(false);

  const resultsRef = useRef(null);

  useOutsideClick(resultsRef, () => {
    setIsOpen(false);
    setValue('');
  });

  useEscapeKey(() => {
    setIsOpen(false);
    setValue('');
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const { data, error, isLoading } = useSWR(
    debouncedValue?.length > 0
      ? `${GOOGLE_BOOKS_API}?q=${debouncedValue}`
      : null,
    fetcher,
  );

  const toggleCheckbox = (itemId: string) => {
    setSelectedItems((prev: Set<string>) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
        fetch('/api/book', {
          method: 'POST',
          body: JSON.stringify({
            google_book_id: itemId,
            list_id: listId,
          }),
        }).catch((err) => console.error(err));
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (debouncedValue?.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedValue]);

  return (
    <div className="mt-3 relative w-full">
      <form>
        <label
          for="book-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search books to add to list
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="book-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search books..."
            value={value}
            onChange={onChange}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </form>

      {isOpen && (
        <div
          ref={resultsRef}
          className="absolute w-full bg-white max-h-52 overflow-y-auto shadow-md px-3 mt-1 border border-zinc-300 rounded"
        >
          {isLoading && <Spinner size="3" />}
          {data?.items?.map((item: any) => (
            <div key={item.id} className="py-1 flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.has(item.id)}
                onChange={() => toggleCheckbox(item.id)}
              />
              <img
                className="ml-2 inline-block h-12 rounded"
                src={item.volumeInfo.imageLinks?.thumbnail}
                alt={item.volumeInfo.title}
              />
              <span className="ml-2">{item.volumeInfo.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
