import { Connection } from 'mongoose'
import { DeveloperSchema } from './developer.schema'

const isTest = process.env.NODE_ENV === 'test'
const injectDatabase = () => (isTest ? 'TEST_DATABASE_CONNECTION' : 'DATABASE_CONNECTION')

export const developerProvider = [
  {
    provide: 'DEVELOPER_MODEL',
    useFactory: (connection: Connection) => connection.model('developer', DeveloperSchema),
    inject: [injectDatabase()],
  },
]
