import Head from 'next/head'
import Image from 'next/image'
import BookTile from '../components/BookTile'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Booklist</title>
        <link rel="icon" href="/book.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-start px-20 pt-20 text-center">
        <h1 className="flex items-center text-6xl font-bold">
          <Image src="/book.png" alt="Book" width={70} height={70} />
          <span className="pb-3">Booklist</span>
        </h1>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around border sm:w-full">
          <BookTile />
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t"></footer>
    </div>
  )
}
