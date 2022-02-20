import Head from 'next/head'
import BookTile from '../components/BookTile'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Booklist</title>
        <link rel="icon" href="/book.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-start px-20 pt-20 text-center">
        <h1 className="text-6xl font-bold">Booklist</h1>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around border sm:w-full">
          <BookTile />
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="ml-2 h-4" />
        </a>
      </footer>
    </div>
  )
}
