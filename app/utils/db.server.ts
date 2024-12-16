import { MongoClient, ObjectId } from "mongodb";
import { BookResult } from "~/types";

export const DB_NAME = "share-reads";

export enum COLLECTIONS {
  LISTS = "lists",
}

export interface ListModel {
  _id: ObjectId | string;
  books: BookResult[];
}

const uri = process.env.MONGODB_URI!;
let mongodb: MongoClient;

declare global {
  // eslint-disable-next-line no-var
  var __db: MongoClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  mongodb = new MongoClient(uri);
} else {
  if (!global.__db) {
    global.__db = new MongoClient(uri);
  }
  mongodb = global.__db;
}

export { mongodb, ObjectId };
