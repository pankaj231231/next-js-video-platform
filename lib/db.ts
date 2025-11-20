import mongoose from "mongoose";

// Use '!' to assert that the environment variable is available
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env.local file");
}

// 1. Extend the global object to store the connection state
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // 2. Return cached connection if available
  if (cached.conn) {
    console.log("Using cached MongoDB connection.");
    return cached.conn;
  }

  // 3. Create a new connection promise if none exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Recommended for serverless environments
      maxPoolSize: 10,
    };

    // Assign the connection promise directly to cached.promise
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((_mongoose) => {
      // The Mongoose object contains the connection object
      return _mongoose.connection;
    });
  }

  // 4. Await the promise to get the connection object
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset promise on failure
    throw error;
  }
}

// Extend Node's global object with the mongoose property
// (Necessary for TypeScript environments)
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}
