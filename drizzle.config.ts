import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: `./.${process.env.NODE_ENV}.env` });

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    port: parseInt(process.env.DATABASE_PORT),
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
  },
});

//import type { Config } from "drizzle-kit";
// import * as dotenv from "dotenv";
//
// // .env.local 파일 로드
// dotenv.config({ path: ".env.local" });
//
// export default {
//   dialect: "mysql",
//   out: "./database/migrations",
//   schema: "./database/schema.ts",
//   breakpoints: false,
//   dbCredentials: {
//     host: process.env.DATABASE_HOST as string,
//     user: process.env.DATABASE_USERNAME as string,
//     password: process.env.DATABASE_PASSWORD as string,
//     database: process.env.DATABASE_SCHEMA as string,
//   },
// } satisfies Config;