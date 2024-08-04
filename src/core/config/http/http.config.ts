import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export default class HttpConfig {
  /**
   * Inicialização da configuração de acesso via HTTP á API
   * @param app Instancia da aplicação
   */
  public static start(app: INestApplication) {
    app.enableCors({ origin: '*' });
    app.use(helmet());
  }
}
