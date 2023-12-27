'use client'

import React, { useState } from 'react'
import Search from './Search'

type Props = {}

function List({}: Props) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  console.log('🚀 ~ file: List.tsx:10 ~ List ~ selectedItems:', selectedItems)
  return (
    <>
      <Search
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
