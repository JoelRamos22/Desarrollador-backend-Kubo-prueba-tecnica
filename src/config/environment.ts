import dotenv from 'dotenv';

dotenv.config();

interface Config {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
}

export const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 5000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres.wmkvboyjvcrmnlpsjbmg:[boiLc4uHJdi0FxU8]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
};

// Validate that required environment variables are set
if (!config.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}