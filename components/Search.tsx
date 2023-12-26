'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField } from '@radix-ui/themes'
import React from 'react'

type Props = {}

function Search({}: Props) {
  return (
    <TextField.Root className="">
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input placeholder="Search books…" />
    </TextField.Root>
  )
}

export default Search
