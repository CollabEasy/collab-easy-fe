import { AppEnvs, NodeEnvs } from "./environment";

export const Config = {
  appEnv: process.env.APP_ENV || AppEnvs.DEVELOPMENT,
  nodeEnv: process.env.NODE_ENV || NodeEnvs.DEVELOPMENT,
  backendEndpoint: process.env.API_ENDPOINT || 'http://1598-2405-201-401a-7815-74b4-77d0-3473-2b7.ngrok.io',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000'
}
