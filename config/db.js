// src/db/index.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://root:example@mongo:27017';
const MONGODB_DB_NAME = process.env.MONGO_DB_NAME || 'todos-app';

let client;
let db;

/**
 * Connect to MongoDB (idempotent – safe to call multiple times)
 * @returns {Promise<import('mongodb').Db>}
 */
export async function connectToDatabase() {
  if (db) {
    return db; // already connected
  }

  try {
    client = await mongoose.connect(MONGODB_URI, {
      // Recommended options in 2024+
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      // heartbeatFrequencyMS: 10000,    // optional
      // retryWrites: true,              // usually enabled by default
    });
    console.log('→ MongoDB connected successfully');

    console.log(`→ Using database: ${MONGODB_DB_NAME}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error; // let the caller handle it
  }
}

/**
 * Get the "todos" collection
 * Creates it implicitly on first use if it doesn't exist
 */
export async function getTodosCollection() {
  const db = await connectToDatabase();
  const collect = db.collection('todo')
  return collect;
}


// Graceful shutdown (important in containers)
export async function closeDatabase() {
  if (client?.isConnected?.()) {
    await client.close();
    console.log('→ MongoDB connection closed');
    client = null;
    db = null;
  }
}

// // Optional: export a ready-to-use collection promise (most common pattern)
// export const todosCollection = (async () => {
//   try {
//     const db = await connectToDatabase();
//     const collect = db.collection('todo')
//     return collect;
//   } catch (err) {
//     console.error('Failed to initialize todos collection:', err);
//     process.exit(1); // or throw – depending on your preference
//   }
// })();

// export const getAllCollections = async()=>{
//   try{
//     const db = await connectToDatabase();
//     const db_collections = db.listCollections().toArray();
//     const collectNames = (await db_collections).map( c => c.name)
//     console.log('Collection Names',collectNames)
//     return collectNames;
//   }catch(err){
//     console.error('Failed to initialize todos collection:', err);
//     process.exit(1);
//   }
// };