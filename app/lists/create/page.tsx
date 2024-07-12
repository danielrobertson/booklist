import Head from 'next/head';
import { Theme } from '@radix-ui/themes';
import { generateSlug } from 'random-word-slugs';

import prisma from '../../../prisma/db';
import Header from '../../../components/Header';
import ShareLink from '../../../components/ShareLink';
import { ListName } from '../../../components/ListNameInput';
import CreateList from '../../../components/CreateList';

export default async function CreateListPage() {
  const { external_id: externalListId, id } = await prisma.list.create({});
  const defaultTitle = generateSlug(3, { format: 'title' });

  return (
    <Theme>
      <Head>
        <title>Booklists</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="mt-8 mx-auto max-w-screen-xl px-4">
        <ListName title={defaultTitle} />
        <ShareLink externalListId={externalListId || ''} />
        <CreateList listId={id} />
      </main>
    </Theme>
  );
}
