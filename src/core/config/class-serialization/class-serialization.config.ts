import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export default class ClassSerialization {
  /**
   * Inicialização do ClassTransform biblioteca responsável pela serialização dos Dtos
   * @param app Instancia da aplicação
   */
  public static start(app: INestApplication): void {
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  }
}
