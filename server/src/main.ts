import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3001;
  await app
    .listen(3001)
    .then(() => console.log(`listening on http://localhost:${PORT}`));
}
bootstrap();
