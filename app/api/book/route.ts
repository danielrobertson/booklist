import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/db';

// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export async function POST(request: Request) {
  const res = await request.json();
  const { google_book_id, list_id } = res;

  let bookId = null;
  try {
    const book = await prisma.books.create({
      data: {
        google_book_id,
      },
    });
    bookId = book.id;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const foundBook = await prisma.books.findFirst({
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

  let xref;
  const foundXref = await prisma.book_list_xref.findFirst({
    where: {
      list_id: list_id,
      book_id: bookId,
    },
  });

  if (foundXref) {
    xref = foundXref;
  }

  if (!xref) {
    try {
      xref = await prisma.book_list_xref.create({
        data: {
          list_id,
          book_id: bookId,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  console.log('🚀 ~ file: route.ts:41 ~ POST ~ xref:', xref);
  return Response.json({ data: xref });
}
