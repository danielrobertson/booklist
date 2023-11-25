import Head from 'next/head'
import Image from 'next/image'
import BookTile from '../components/BookTile'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Booklist</title>
        <link rel="icon" href="/book.ico" />
      </Head>
        <header className='flex px-5 py-2'>
            <Image className='rounded-lg mr-3' src="/bookface.png" alt="Book" width={40} height={40} />
          <h1 className="text-4xl font-bold">
            booklistasdf
          </h1>
        </header>

      <main className="flex w-full flex-1 flex-col items-center justify-start px-20 pt-20 text-center">

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around border sm:w-full">
          <BookTile />
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t"></footer>
    </div>
  )
}
