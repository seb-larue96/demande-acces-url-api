import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './config/swagger.config';
import { configureGlobalInterceptors } from './config/interceptor.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);
  configureGlobalInterceptors(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
