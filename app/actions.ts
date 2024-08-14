'use server';

import { db } from '../db';

export async function createList() {
  try {
    const newList = await db.console.log('🚀 ~ createList ~ newList:', newList);
    return newList.id;
  } catch (error) {
    console.error('Failed to create list: ', error);
  }
}

export async function updateListName(newName: string, listId: string) {
  try {
    await prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        name: newName,
      },
    });
  } catch (err) {
    console.error(err);
  }
}
