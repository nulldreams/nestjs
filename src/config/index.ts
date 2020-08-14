import * as dotenv from 'dotenv'
const path = require('path')

const envPath = file => path.join(__dirname, file)

const envs = {
  production: envPath('/envs/.env'),
  dev: envPath('/envs/.dev.env'),
  test: envPath('/envs/.test.env'),
}
dotenv.config({ path: envs[process.env.NODE_ENV] })
const config = {
  port: process.env.PORT,
  database: {
    name: process.env.DB_DATABASE,
    url: process.env.MONGO_URL
      ? process.env.MONGO_URL
      : `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin`,
  },
}

export default config
