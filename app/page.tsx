import Head from 'next/head';
import Image from 'next/image';
import { Theme } from '@radix-ui/themes';
import Header from '../components/Header';
import Link from 'next/link';

export default async function Home() {
  return (
    <Theme>
      <Head>
        <title>Booklists</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />

      <main className="mt-8">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
              A better way to organize and share your book collections
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
              From your shelf to the world—organize and share your books
              effortlessly, making every read a shared adventure.
            </p>

            <Link
              href="/lists/create"
              className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg me-2 mb-2  focus:outline-none"
            >
              Create a List
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              className=""
              src="/book_open.png"
              alt="Book"
              width={400}
              height={400}
              loading="eager"
              priority={true}
            />
          </div>
        </div>
      </main>
    </Theme>
  );
}
