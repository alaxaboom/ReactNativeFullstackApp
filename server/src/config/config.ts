import dotenv from 'dotenv';
dotenv.config();

interface DbConfig {
  username: string;
  password: string | null;
  database: string;
  host: string;
  port: number;
  dialect: 'postgres';
  dialectOptions?: {
    timezone: string;
  };
}

const config = {
  development: {
    username: process.env.DB_USER ,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'RN_Test',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    dialectOptions: {
      timezone: '+03:00',
    },
  },
} satisfies Record<string, DbConfig>;

export default config;