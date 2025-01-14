import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { createPool } from 'mysql2/promise';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../db/schema';

export type BoardDB = MySql2Database<typeof schema>;

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db: BoardDB;

  onModuleInit() {
    try {
      const poolConnection = createPool({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        connectionLimit: 50,
      });
      this.db = drizzle(poolConnection, {
        casing: 'snake_case',
        logger: true,
      });
    } catch (error) {
      console.error('Database connection failed', error);
    }
  }

  getDb(): BoardDB {
    return this.db;
  }
}
