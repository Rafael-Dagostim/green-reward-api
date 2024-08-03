import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export default class SwaggerConfiguration {
  private name: string;
  private version: string;
  private description: string;
  private app: INestApplication<any>;

  /**
   * Configuração da documentação da API através do Swagger
   * @param name Nome da aplicação
   * @param description Descrição da aplicação
   */
  public constructor(app: INestApplication) {
    this.version = process.env.npm_package_version;
    this.app = app;
  }
  /**
   * Definir nome á ser apresentado na documentação do Swagger
   * @param name Nome da aplicação
   */
  public setName(name: string) {
    this.name = name;
    return this;
  }
  /**
   * Definir descrição á ser apresentado na documentação do Swagger
   * @param description Descrição da aplicação
   */
  public setDescription(description: string) {
    this.description = description;
    return this;
  }

  /**
   * Iniciar e abrir rota para a documentação Swagger
   * @param url Url em que será disponibilizado a documentação
   */
  public async start(url: string) {
    const config = this.createConfig();
    const document = this.createDocument(config);
    return this.openPortToAccess(document, url);
  }

  private createConfig() {
    return new DocumentBuilder()
      .setTitle(this.name)
      .setDescription(this.description)
      .setVersion(this.version)
      .build();
  }

  private createDocument(config: Omit<OpenAPIObject, 'paths'>) {
    const app = this.app;
    return SwaggerModule.createDocument(app, config);
  }

  private openPortToAccess(document: OpenAPIObject, url: string) {
    return SwaggerModule.setup(url, this.app, document);
  }
}
