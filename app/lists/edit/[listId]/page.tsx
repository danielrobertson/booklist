import Head from 'next/head';
import { Theme } from '@radix-ui/themes';

import Header from '@/components/Header';
import ShareLink from '@/components/ShareLink';
import { ListName } from '@/components/ListNameInput';
import CreateList from '@/components/CreateList';

export default async function EditListPage({
  params,
}: {
  params: { listId: string };
}) {
  const { listId } = params;
  console.log('🚀 ~ EditListPage ~ listId:', listId);

  return (
    <Theme>
      <Head>
        <title>Booklists</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="mt-8 mx-auto max-w-screen-xl px-4">
        <ListName title={'foobar'} listId={listId} />
        <ShareLink listId={listId || ''} />
        <CreateList listId={listId} />
      </main>
    </Theme>
  );
}
