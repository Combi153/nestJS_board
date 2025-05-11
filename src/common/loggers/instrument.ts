import * as Sentry from '@sentry/nestjs';
import { config } from 'dotenv';

config({ path: './.prod.env' });

console.log(process.env.SENTRY_DSN);
Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
