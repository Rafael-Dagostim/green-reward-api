import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CorporationCreateDto } from './domain/dto/corporation-create.dto';
import { CorporationFindManyDto } from './domain/dto/corporation-find-many.dto';
import { CorporationUpdateDto } from './domain/dto/corporation-update.dto';
import { CorporationEntity } from './domain/entities/corporation.entity';
import { CorporationCreateService } from './services/corporation-create.service';
import { CorporationDeleteService } from './services/corporation-delete.service';
import { CorporationFindManyService } from './services/corporation-find-many.service';
import { CorporationFindOneService } from './services/corporation-find-one.service';
import { CorporationUpdateService } from './services/corporation-update.service';
import SponsorCreateAwardService from './services/sponsor-create-award.service';
import { SponsorCreateAwardDTO } from './domain/dto/sponsor-create-award.dto';
import { AwardEntity } from 'src/shared/entities/award.entity';

@ApiTags('corporation')
@Controller('corporation')
export class CorporationController {
  constructor(
    private readonly corporationFindManyService: CorporationFindManyService,
    private readonly corporationFindOneService: CorporationFindOneService,
    private readonly corporationCreateService: CorporationCreateService,
    private readonly corporationUpdateService: CorporationUpdateService,
    private readonly corporationDeleteService: CorporationDeleteService,
    private readonly sponsorCreateAwardService: SponsorCreateAwardService,
  ) {}

  /**
   * Buscar todas as corporações cadastradas no sistema
   * @param dto Filtro para a busca
   * @returns Dados das Corporações
   */
  @Get()
  findAll(@Query() dto: CorporationFindManyDto): Promise<CorporationEntity[]> {
    return this.corporationFindManyService.execute(dto);
  }

  /**
   * Buscar dados de uma corporação com base no ID dela
   * @param id ID da corporação
   * @returns Dados da corporação
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CorporationEntity> {
    return this.corporationFindOneService.execute(id);
  }

  /**
   * Criar nova corporação
   * @param dto Dados da nova corporação
   * @returns Dados da corporação cadastrada na base de dados
   */
  @Post()
  create(@Body() dto: CorporationCreateDto): Promise<CorporationEntity> {
    return this.corporationCreateService.execute(dto);
  }

  /**
   * Criar novo premio com o nome do patrocinador
   * @param dto Dados do novo premio
   * @returns Dados do novo premio do patrocinador cadastrado na base de dados
   */
  @Post('/sponsor/award')
  async createAward(@Body() dto: SponsorCreateAwardDTO): Promise<AwardEntity> {
    return await this.sponsorCreateAwardService.execute(dto);
  }

  /**
   * Atualizar dados de uma corporação com base em seu ID
   * @param id ID da corporação
   * @param dto Novos dados da corporação
   * @returns Dados da corporação atualizados na base de dados
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CorporationUpdateDto,
  ): Promise<CorporationEntity> {
    return this.corporationUpdateService.execute(id, dto);
  }

  /**
   * Deletar uma corporação com base em seu ID
   * @param id ID da corporação
   * @returns Dados deletados da corporação
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<CorporationEntity> {
    return this.corporationDeleteService.execute(id);
  }
}
