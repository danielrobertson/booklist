import Head from 'next/head';
import { Theme } from '@radix-ui/themes';
import { generateSlug } from 'random-word-slugs';

import prisma from '../../../prisma/db';
import Header from '../../../components/Header';
import ShareLinkButton from '../../../components/ShareLinkButton';
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
      <main className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <ShareLinkButton externalListId={externalListId || ''} />
        <ListName title={defaultTitle} />
        <CreateList listId={id} />
      </main>
    </Theme>
  );
}
