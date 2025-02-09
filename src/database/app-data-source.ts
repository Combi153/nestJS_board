import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: './.prod.env' });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: ['./src/database/migration/*.ts'],
  synchronize: true,
  logging: true,
});
