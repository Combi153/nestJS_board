import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';

export const db = drizzle({
  connection: process.env.DATABASE_URL,
  casing: 'snake_case',
  logger: true,
});
