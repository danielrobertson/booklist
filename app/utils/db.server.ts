import { BSON, MongoClient } from "mongodb";

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

const ObjectId = BSON.ObjectId;

export { mongodb, ObjectId };
