import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './config/swagger.config';
import { configureGlobalInterceptors } from './config/interceptor.config';
import { configureValidationPipes } from './config/validation-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);
  configureValidationPipes(app);
  configureGlobalInterceptors(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
