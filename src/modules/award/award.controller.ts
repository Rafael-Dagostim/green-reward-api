import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import SponsorCreateAwardService from './services/sponsor-create-award.service';
import { SponsorCreateAwardDTO } from '@modules/award/domain/dto/sponsor-create-award.dto';
import { AwardEntity } from './domain/entities/award.entity';
import RescueAwardService from './services/rescue-award.service';

@Controller('award')
@ApiTags('award')
export default class AwardController {
  public constructor(
    private readonly sponsorCreateAwardService: SponsorCreateAwardService,
    private readonly rescueAwardService: RescueAwardService,
  ) {}
  /**
   * Criar novo premio com o nome do patrocinador
   * @param dto Dados do novo premio
   * @returns Dados do novo premio do patrocinador cadastrado na base de dados
   */
  @Post()
  async createAward(@Body() dto: SponsorCreateAwardDTO): Promise<AwardEntity> {
    return await this.sponsorCreateAwardService.execute(dto);
  }

  /**
   * Resgatar premiação
   * @param awardId Id da premiação
   * @param userId Id do usuário que está resgatando
   * @returns Link para o resgate
   */
  @Patch('/:id/rescue/:userId')
  async rescueAward(
    @Param('id') awardId: number,
    @Param('userId') userId: number,
  ): Promise<{ link: string }> {
    return await this.rescueAwardService.execute(awardId, userId);
  }
}
