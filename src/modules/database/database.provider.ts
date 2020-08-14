import { MongoMemoryServer } from 'mongodb-memory-server'
import * as mongoose from 'mongoose'
import config from 'src/config'

export const testDatabase = [
  {
    provide: 'TEST_DATABASE_CONNECTION',
    useFactory: async () => {
      const mongod = new MongoMemoryServer()
      const port = await mongod.getPort()
      const database = await mongod.getDbName()
      return mongoose.connect(`mongodb://127.0.0.1:${port}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    },
  },
]

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(config.database.url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
  },
]
