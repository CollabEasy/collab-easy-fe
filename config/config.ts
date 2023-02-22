import { AppEnvs, NodeEnvs } from "./environment";


export const Config = {
  appEnv: process.env.APP_ENV || AppEnvs.DEVELOPMENT,
  nodeEnv: process.env.NODE_ENV || NodeEnvs.DEVELOPMENT,
  backendEndpoint: process.env.API_ENDPOINT || 'http://52.88.51.96:3001',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000'
}
