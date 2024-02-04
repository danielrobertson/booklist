import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/db';

// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export async function POST(request: Request) {
  const res = await request.json();
  console.log('🚀 ~ POST ~ res:', res);
  const { google_book_id, list_id } = res;

  let bookId = null;
  try {
    const book = await prisma.book.create({
      data: {
        google_book_id,
      },
    });
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

  const result = await prisma.list_item.upsert({
    where: {
      unique_list_book_item: { book_id: bookId as bigint, list_id },
    },
    update: {},
    create: {
      book_id: bookId as bigint,
      list_id: list_id,
    },
  });
  console.log('🚀 ~ POST ~ result:', result);

  return Response.json({ data: result });
}
