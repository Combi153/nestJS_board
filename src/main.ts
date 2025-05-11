import './common/loggers/instrument';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/exception-filters/global-exception-filter';
import { DataSource } from 'typeorm';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // use exception filters
  const logger = new Logger('Bootstrap');

  try {
    const dataSource = app.get(DataSource);
    if (dataSource.isInitialized) {
      await dataSource.runMigrations({ transaction: 'all' });
    } else {
      throw new Error('Database not initialized');
    }
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
