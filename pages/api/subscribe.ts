import { request } from "https";

import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import url from 'url';

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const dbName = url.parse(uri).pathname.substr(1);
  const db = client.db(dbName);
  cachedDb = db;
  return db;
''
}

export default async (request: NowRequest, response: NowResponse) => {
  const { email } = request.body;
  console.log(process.env.MONGODB_URI);
  const db = await connectToDatabase(process.env.MONGODB_URI);
  console.log(db);
  const collection = db.collection('subscribers');
  await collection.insertOne({
    email,
    createdAt: new Date
  });
  return response.status(201).json({ ack: true });
}
