import developmentConfig from '../../envs/development.env';
import productionConfig from '../../envs/production.env';
import * as dotenv from 'dotenv';
dotenv.config();

export const getEnvironment = () => {
  const env = process.env.ENVIRONMENT;
  switch (env) {
    case 'production':
      return [productionConfig];
    case 'development':
      return [developmentConfig];
    default:
      throw new Error(`No file for found for env: ${env}`);
  }
};
