import { config } from 'dotenv';

config();

export const env = (key: string, fallback?: any) => {
  const value = process.env[key];
  if (value !== undefined) {
    if (isFinite(value as any)) {
      return Number(value);
    }

    if (/^(true|false)$/i.test(value)) {
      return Boolean(value);
    }

    return value;
  }

  if (fallback !== undefined) {
    return fallback;
  }

  console.error(`Missing required environment variable: ${key}`);
  process.exit(1);
};

const ENV = env('NODE_ENV', 'development');

export default {
  environment: ENV,
  isDevelopment: ENV === 'development',
  isProduction: ENV === 'production',
  port: env('PORT', 3000),
  secretKey: env('SECRET_KEY'),
  typeorm: {
    type: env('TYPEORM_CONNECTION', 'postgres'),
    host: env('TYPEORM_HOST', 'localhost'),
    port: env('TYPEORM_PORT', 5432),
    username: env('TYPEORM_USERNAME'),
    password: env('TYPEORM_PASSWORD'),
    database: env('TYPEORM_DATABASE'),
    synchronize: env('TYPEORM_SYNCHRONIZE', false),
    logging: env('TYPEORM_LOGGING', true),
  },
};
