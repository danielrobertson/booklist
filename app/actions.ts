'use server';

import prisma from '../prisma/db';

export async function updateListName(newName: string, listId: bigint) {
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
    console.log(err);
  }
}
