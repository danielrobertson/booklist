import Head from 'next/head';
import Image from 'next/image';
import { Theme } from '@radix-ui/themes';

import prisma from '../prisma/db';

import ShareLinkButton from '../components/ShareLinkButton';
import CreateList from '../components/CreateList';
import UserSignInOutButton from '../components/UserSignInOutButton';

export default async function Home() {
  const { external_id: externalListId, id } = await prisma.list.create({});

  return (
    <Theme>
      <Head>
        <title>Booklists</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <header className="flex justify-end p-3">
        <UserSignInOutButton />
      </header>
      <div className="flex items-center justify-center px-5 py-2 mt-7">
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
      </div>

      <main className="mt-8 mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <ShareLinkButton externalListId={externalListId || ''} />
        <CreateList listId={id} />
      </main>
    </Theme>
  );
}
