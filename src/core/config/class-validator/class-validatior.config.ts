import { INestApplication, ValidationPipe } from '@nestjs/common';

export default class ClassValidator {
  /**
   * Inicialização do ClassValidator biblioteca responsável pela criação da validação dos Dtos
   * @param app Instancia da aplicação
   */
  public static start(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe());
  }
}
