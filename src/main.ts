import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDefinition } from './core/config/swagger/swagger.definition';
import ClassValidator from './core/config/class-validator/class-validatior.config';
import HttpConfig from './core/config/http/http.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  SwaggerDefinition.start(app, '/doc');
  ClassValidator.start(app);
  HttpConfig.start(app);

  await app.listen(process.env.PORT);
}
bootstrap();
