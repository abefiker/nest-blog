import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger, ConsoleLogger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Abemelek App',
    })
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))
  app.use(cookieParser())
  app.useLogger(new Logger())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
