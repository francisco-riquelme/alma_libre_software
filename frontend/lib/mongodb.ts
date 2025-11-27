import { MongoClient, Db } from 'mongodb'

function getMongoConfig() {
  const uri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB || 'alma_libre'

  if (!uri) {
    throw new Error('Por favor agrega MONGODB_URI en tu archivo .env.local')
  }

  return { uri, dbName }
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) {
    return clientPromise
  }

  const { uri } = getMongoConfig()

  if (process.env.NODE_ENV === 'development') {
    // En desarrollo, usar una variable global para que el módulo se reutilice
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    // En producción, crear un nuevo cliente
    client = new MongoClient(uri)
    clientPromise = client.connect()
  }

  return clientPromise
}

export async function getDatabase(): Promise<Db> {
  const { dbName } = getMongoConfig()
  const client = await getClientPromise()
  return client.db(dbName)
}

// Export lazy para evitar ejecución inmediata
export default getClientPromise

