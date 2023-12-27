'use client'

import React, { useState } from 'react'
import Search from './Search'

type Props = {
  listId: bigint
}

function List({ listId }: Props) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  console.log('🚀 ~ file: List.tsx:10 ~ List ~ selectedItems:', selectedItems)

  return (
    <>
      <Search
        listId={listId}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <ul>
        {Array.from(selectedItems).map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </>
  )
}

export default List
