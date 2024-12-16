// libs/mongoose.ts
import mongoose from "mongoose"

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: null | typeof import("mongoose")
    promise: null | Promise<typeof import("mongoose")>
  }
}

export {}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env")
}

const MONGODB_URI = process.env.MONGODB_URI

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
