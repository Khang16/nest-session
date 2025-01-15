import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { RedisStore } from 'connect-redis';
import { Redis } from 'ioredis';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redisClient = new Redis({
    host: 'localhost',
    port: 6379,
  });
  app.use(
    session({
      name: 'connectSession',
      store: new RedisStore({
        client: redisClient,
        prefix: 'session:',
      }),
      secret: 'secret_private',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      },
    }),
  );


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();