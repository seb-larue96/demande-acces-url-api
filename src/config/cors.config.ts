import { INestApplication } from '@nestjs/common';

export function configureCors(app: INestApplication) {
  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN?.split(',') || ['http://localhost:4200'],
    credentials: true,
  });
}