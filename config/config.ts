import { AppEnvs, NodeEnvs } from "./environment";


export const Config = {
  appEnv: process.env.APP_ENV || AppEnvs.DEVELOPMENT,
  nodeEnv: process.env.NODE_ENV || NodeEnvs.DEVELOPMENT,
  backendEndpoint: process.env.API_ENDPOINT || 'http://wondor-lb-2124620248.us-east-1.elb.amazonaws.com/',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000'
}
