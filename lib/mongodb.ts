/* import { MongoClient } from "mongodb";
/* const client = new MongoClient(uri);
await client.connect();
console.log("Connected!");
console.log(uri)
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise; */


import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!; //asd

let client = new MongoClient(uri);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    // cache dev-ben (hot reload miatt)
    const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        globalWithMongo._mongoClientPromise = client.connect();
    }

    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    clientPromise = client.connect();
}

export default clientPromise;