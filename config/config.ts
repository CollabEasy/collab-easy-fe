import { AppEnvs, NodeEnvs } from "./environment";


export const Config = {
  appEnv: process.env.APP_ENV || AppEnvs.DEVELOPMENT,
  nodeEnv: process.env.NODE_ENV || NodeEnvs.DEVELOPMENT,

  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  // baseUrl: process.env.BASE_URL || 'https://www.wondor.art',
  // baseUrl: process.env.BASE_URL || 'https://main.d3s894l7qdv2do.amplifyapp.com',

  // backendEndpoint: process.env.API_ENDPOINT || 'http://localhost:3001',
  backendEndpoint: process.env.API_ENDPOINT || 'https://yy1qb3cpqf.execute-api.us-west-2.amazonaws.com/prod',
}
