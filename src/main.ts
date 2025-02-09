import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  //
  // const dataSource = app.get(DataSource);
  //
  // await dataSource.initialize();
  // await dataSource.runMigrations({ transaction: 'all' });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
