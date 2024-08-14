import Head from 'next/head';
import { Theme } from '@radix-ui/themes';
import { generateSlug } from 'random-word-slugs';

import prisma from '@/prisma/db';
import Header from '@/components/Header';
import ShareLink from '@/components/ShareLink';
import { ListName } from '@/components/ListNameInput';
import CreateList from '@/components/CreateList';
import { createList } from '@/app/actions';
import { redirect } from 'next/navigation';

export default async function CreateListPage() {
  const externalId = await createList();

  if (externalId) {
    redirect(`/lists/edit/${externalId}`);
  }
  // const defaultTitle = generateSlug(3, { format: 'title' });

  return <div>something went wrong creating list</div>;
}
