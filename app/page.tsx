import Head from 'next/head'
import Image from 'next/image'
import { Button, Theme } from '@radix-ui/themes'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import Search from '../components/Search'
import { useState } from 'react'
import List from '../components/List'

export default async function Home() {
  const { list_id: listId, id } = await prisma.lists.create({})
  const copyableUrl = `book-list.io/${listId}`

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
        <div className="text-sm font-medium">Share link</div>
        <Button
          variant="surface"
          className="cursor-pointer flex items-center border border-zinc-300 rounded px-2"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>{copyableUrl}</span>
        </Button>
        <div className="mt-4 text-sm font-medium">Add books</div>

        <List listId={id} />
      </main>
    </Theme>
  )
}
