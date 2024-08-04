import { CorporationEntity } from '@modules/corporation/domain/entities/corporation.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllowedTypes, User } from '@shared/decorators';
import { AwardCreateDto } from './domain/dto/award-create.dto';
import { AwardEntity } from './domain/entities/award.entity';
import RescueAwardService from './services/rescue-award.service';
import SponsorCreateAwardService from './services/sponsor-create-award.service';
import { TypeGuard } from '@modules/auth/guards/type.guard';
import { AwardFindManyService } from './services/get-award.service';
import { GetAwardDTO } from './domain/dto/get-award.dto';
import DeleteAwardService from './services/delete-award.service';

@Controller('award')
@ApiTags('award')
@UseGuards(TypeGuard)
export default class AwardController {
  public constructor(
    private readonly sponsorCreateAwardService: SponsorCreateAwardService,
    private readonly rescueAwardService: RescueAwardService,
    private readonly getAwardService: AwardFindManyService,
    private readonly deleteAwardService: DeleteAwardService,
  ) {}

  /**
   * Buscar todas os premios cadastrados no sistema
   * @param dto Filtros
   * @returns Dados dos premios
   */
  @Get('')
  public async get(
    @Query() dto: GetAwardDTO,
    @User() sponsor: CorporationEntity,
  ) {
    return await this.getAwardService.execute(dto, sponsor);
  }
  /**
   * Criar novo premio com o nome do patrocinador
   * @param dto Dados do novo premio
   * @returns Dados do novo premio do patrocinador cadastrado na base de dados
   */
  @Post()
  @AllowedTypes('SPONSOR')
  async createAward(
    @Body() dto: AwardCreateDto,
    @User() sponsor: CorporationEntity,
  ): Promise<AwardEntity> {
    return await this.sponsorCreateAwardService.execute(dto, sponsor);
  }

  /**
   * Resgatar premiação
   * @param awardId Id da premiação
   * @param userId Id do usuário que está resgatando
   * @returns Link para o resgate
   */
  @Patch('/:id/rescue/:userId')
  @AllowedTypes('PLAYER')
  async rescueAward(
    @Param('id') awardId: number,
    @Param('userId') userId: number,
  ): Promise<{ link: string }> {
    return await this.rescueAwardService.execute(awardId, userId);
  }

  /**
   * Deletar premio pelo Id
   * @param id Id da premiação
   */
  @Delete('/:id')
  @AllowedTypes('PLAYER')
  async deleteAward(@Param('id') awardId: number) {
    return await this.deleteAwardService.execute(awardId);
  }
}
