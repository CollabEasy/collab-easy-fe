import { AppEnvs, NodeEnvs } from "./environment";


export const Config = {
  appEnv: process.env.APP_ENV || AppEnvs.DEVELOPMENT,
  nodeEnv: process.env.NODE_ENV || NodeEnvs.DEVELOPMENT,
  backendEndpoint: process.env.API_ENDPOINT || 'https://kejida35lh.execute-api.us-west-2.amazonaws.com/prod',
  //baseUrl: process.env.BASE_URL || 'https://main.d3s894l7qdv2do.amplifyapp.com/'
  baseUrl: process.env.BASE_URL || 'http://localhost:3000'
}
