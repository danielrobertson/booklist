import { sql } from 'drizzle-orm';
import { pgTable, varchar, timestamp, uuid, serial } from 'drizzle-orm/pg-core';

export const book = pgTable('book', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  googleBookId: varchar('googleBookId').unique(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const list = pgTable('list', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: varchar('name', { length: 256 }),
  description: varchar('description', { length: 256 }),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const list_item = pgTable('listItem', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  createdAt: timestamp('createdAt').defaultNow(),
  listId: uuid('listId').references(() => list.id),
  bookId: uuid('bookId').references(() => book.id),
});
