import Head from 'next/head';
import { Theme } from '@radix-ui/themes';

import Header from '../components/Header';

export default async function Home() {
  return (
    <Theme>
      <Head>
        <title>Booklists</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />

      <main className="mt-8 mx-auto max-w-lg px-4 sm:px-6 lg:px-8"></main>
    </Theme>
  );
}
