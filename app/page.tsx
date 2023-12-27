import Head from 'next/head'
import Image from 'next/image'
import { Theme } from '@radix-ui/themes'
import { PrismaClient } from '@prisma/client'

import ShareLinkButton from '../components/ShareLinkButton'
import List from '../components/List'

const prisma = new PrismaClient()

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
          loading="eager"
          priority={true}
        />
        <h1 className="ml-1 text-2xl font-bold">Booklists</h1>
      </header>

      <main className="mt-8 mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <div className="text-sm font-medium">Share link</div>
        <ShareLinkButton copyableUrl={copyableUrl} />
        <div className="mt-4 text-sm font-medium">Add books</div>
        <List listId={id} />
      </main>
    </Theme>
  )
}
