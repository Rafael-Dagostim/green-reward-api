import PrismaService from 'src/core/database/services/connection.database.service';

export default class CreateUserProvider {
  public constructor(private readonly prismaService: PrismaService) {}

  public async execute() {}
}
