import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDefinition } from './core/config/swagger/swagger.definition';
import ClassValidator from './core/config/class-validator/class-validatior.config';
import ClassSerialization from '@core/config/class-serialization/class-serialization.config';
import HttpConfig from './core/config/http/http.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: false });

  SwaggerDefinition.start(app, '/doc');
  ClassValidator.start(app);
  ClassSerialization.start(app);
  HttpConfig.start(app);

  await app.listen(process.env.PORT);
}
bootstrap();
