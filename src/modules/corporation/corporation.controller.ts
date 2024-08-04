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
  UseGuards,
} from '@nestjs/common';

import { TypeGuard } from '@modules/auth/guards/type.guard';
import { ApiTags } from '@nestjs/swagger';
import { Public, TypesAllowed, User } from '@shared/decorators';
import { CorporationCreateDto } from './domain/dto/corporation-create.dto';
import { CorporationFindManyDto } from './domain/dto/corporation-find-many.dto';
import { CorporationUpdateDto } from './domain/dto/corporation-update.dto';
import { CorporationEntity } from './domain/entities/corporation.entity';
import { CorporationCreateService } from './services/corporation-create.service';
import { CorporationDeleteService } from './services/corporation-delete.service';
import { CorporationFindManyService } from './services/corporation-find-many.service';
import { CorporationFindOneService } from './services/corporation-find-one.service';
import { CorporationUpdateService } from './services/corporation-update.service';
import SponsorTransferPointsToInstitutionService from './services/sponsor-transfer-points-to-institution.service';

@ApiTags('corporation')
@Controller('corporation')
@UseGuards(TypeGuard)
@TypesAllowed('INSTITUTION', 'SPONSOR')
export class CorporationController {
  constructor(
    private readonly corporationFindManyService: CorporationFindManyService,
    private readonly corporationFindOneService: CorporationFindOneService,
    private readonly corporationCreateService: CorporationCreateService,
    private readonly corporationUpdateService: CorporationUpdateService,
    private readonly corporationDeleteService: CorporationDeleteService,
    private readonly sponsorTransferPointsService: SponsorTransferPointsToInstitutionService,
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
  @Public()
  create(@Body() dto: CorporationCreateDto): Promise<CorporationEntity> {
    return this.corporationCreateService.execute(dto);
  }

  /**
   * Atualizar dados de uma corporação com base em seu ID
   * @param id ID da corporação
   * @param dto Novos dados da corporação
   * @returns Dados da corporação atualizados na base de dados
   */
  @Patch('')
  @Public()
  update(
    @Body() dto: CorporationUpdateDto,
    @User() user: CorporationEntity,
  ): Promise<CorporationEntity> {
    return this.corporationUpdateService.execute(user, dto);
  }

  /**
   * Transferir pontos do patrocinador para a instituição
   * @param sponsorId ID do patrocinador
   * @param institutionId ID da instituição
   * @param points Pontos a serem transferidos
   * @returns Mensagem de pontos transferidos
   */
  @Patch('/sponsor/:sponsorId/institution/:institutionId/points/:points')
  sponsorTransferPoints(
    @Param('sponsorId', ParseIntPipe) sponsorId: number,
    @Param('institutionId', ParseIntPipe) institutionId: number,
    @Param('points', ParseIntPipe) points: number,
  ): Promise<{ message: string }> {
    return this.sponsorTransferPointsService.execute(institutionId, sponsorId, points);
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
