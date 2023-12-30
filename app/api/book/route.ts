import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/db';

// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export async function POST(request: Request) {
  const res = await request.json();
  console.log('🚀 ~ file: route.ts:12 ~ POST ~ res:', res);
  const { google_book_id, list_id } = res;

  let bookId = null;
  try {
    const book = await prisma.book.create({
      data: {
        google_book_id,
      },
    });
    console.log('🚀 ~ file: route.ts:22 ~ POST ~ created book:', book);
    bookId = book.id;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const foundBook = await prisma.book.findFirst({
        where: {
          google_book_id,
        },
      });

      if (foundBook) {
        bookId = foundBook.id;
      } else {
        throw error;
      }
    }
  }

  let listItemRecord;
  const foundListItem = await prisma.list_item.findFirst({
    where: {
      list_id: list_id,
      book_id: bookId as bigint,
    },
  });

  console.log('🚀 existing listItemRecord:', listItemRecord);
  if (foundListItem) {
    listItemRecord = foundListItem;
  } else {
    try {
      listItemRecord = await prisma.list_item.create({
        data: {
          list_id,
          book_id: bookId as bigint,
        },
      });
      console.log('🚀 created listItem ', listItemRecord);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return Response.json({ data: listItemRecord });
}
