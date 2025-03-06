import dotenv from 'dotenv';

dotenv.config();

interface Config {
    NODE_ENV: string;   
    PORT: number;
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
}

export const config: Config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT) || 3000,
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL || '',
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN || ''
};

// Validate that required environment variables are set
if (!config.TURSO_DATABASE_URL) {
    throw new Error('TURSO_DATABASE_URL is required');
}

if (!config.TURSO_AUTH_TOKEN) {
    throw new Error('TURSO_AUTH_TOKEN is required');
}