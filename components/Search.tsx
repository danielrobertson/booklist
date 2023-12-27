'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField } from '@radix-ui/themes'
import { useDebounce } from 'usehooks-ts'

function useEscapeKey(callback: any) {
  useEffect(() => {
    function handleEscape(event: any) {
      if (event.key === 'Escape') {
        callback()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [callback])
}

function useOutsideClick(ref: any, callback: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, callback])
}

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes'

type Props = {
  selectedItems: Set<string>
  setSelectedItems: (newSet: Set<string>) => void
}

function Search({ selectedItems, setSelectedItems }: Props) {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce<string>(value, 500)
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const resultsRef = useRef(null)
  useOutsideClick(resultsRef, () => setIsOpen(false))
  useEscapeKey(() => setIsOpen(false))

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`${GOOGLE_BOOKS_API}?q=${debouncedValue}`)
      const data = await response.json()
      console.log(data.items)
      setResults(data.items)

      if (data.items.length > 0) {
        console.log(
          '🚀 ~ file: Search.tsx:41 ~ fetchBooks ~ data.items.length:',
          data.items.length,
        )
        setIsOpen(true)
      }
    }

    if (debouncedValue?.length > 0) {
      fetchBooks()
    }
  }, [debouncedValue])

  const toggleCheckbox = (itemId: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  return (
    <>
      <TextField.Root className="">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          size="3"
          onChange={onChange}
          placeholder="Search books…"
        />
      </TextField.Root>
      <div>
        {isOpen && (
          <div
            ref={resultsRef}
            className="absolute bg-white max-h-52 overflow-y-auto shadow-md p-3 mt-1 border border-zinc-300 rounded"
          >
            {results.map((item: any) => (
              <div key={item.id} className="py-1">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={() => toggleCheckbox(item.id)}
                />
                <img
                  className="ml-2 inline-block h-12 rounded"
                  src={item.volumeInfo.imageLinks?.thumbnail}
                  alt=""
                />
                <span className="ml-2">{item.volumeInfo.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Search
