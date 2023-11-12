const { MongoClient } = require('mongodb');

const url = process.env.DB_CONNECTION_STRING;
const dbName = 'to-do-list';

const client = new MongoClient(url);

let isConnected = false;

export async function connectToDatabase() {
  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  return { db: client.db(dbName), client };
}
