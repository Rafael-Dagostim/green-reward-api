import { INestApplication } from '@nestjs/common';
import SwaggerConfiguration from './swagger.config';

export class SwaggerDefinition {
  /**
   * Inicializar documentação do Swagger
   * @param app Instancia da aplicação
   * @param url Url que será liberada para visualização desta documentação
   */
  public static start(app: INestApplication, url: string) {
    new SwaggerConfiguration(app)
      .setName('GreenRewards')
      .setDescription('API do GreenReward - Aplicação que premia boas ações!')
      .start(url);
  }
}
