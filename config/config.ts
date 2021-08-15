import { AppEnvs, NodeEnvs } from "./environment";

export const Config = {
  appEnv: process.env.APP_ENV || AppEnvs.DEVELOPMENT,
  nodeEnv: process.env.NODE_ENV || NodeEnvs.DEVELOPMENT,
  backendEndpoint: process.env.USER_API_ENDPOINT || 'https://www.wondor.com/' ,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000'
}