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

import { ApiTags } from '@nestjs/swagger';
import { MissionCreateDto } from './domain/dto/mission-create.dto';
import { MissionFindManyDto } from './domain/dto/mission-find-many.dto';
import { MissionUpdateDto } from './domain/dto/mission-update.dto';
import { MissionEntity } from './domain/entities/mission.entity';
import { MissionCreateService } from './services/mission-create.service';
import { MissionDeleteService } from './services/mission-delete.service';
import { MissionFindManyService } from './services/mission-find-many.service';
import { MissionFindOneService } from './services/mission-find-one.service';
import { MissionUpdateService } from './services/mission-update.service';
import { CorporationEntity } from '@modules/corporation/domain/entities/corporation.entity';
import { TypeGuard } from '@modules/auth/guards/type.guard';
import FinishMissionUserService from './services/finish-mission-user.service';
import { AllowedTypes, User } from '@shared/decorators';
import { FinishMissionUserDTO } from './domain/dto/finish-mission-user.dto';
import { UserEntity } from '@modules/user/domain/entities/user.entity';

@ApiTags('mission')
@Controller('mission')
@UseGuards(TypeGuard)
export class MissionController {
  constructor(
    private readonly missionFindManyService: MissionFindManyService,
    private readonly missionFindOneService: MissionFindOneService,
    private readonly missionCreateService: MissionCreateService,
    private readonly missionUpdateService: MissionUpdateService,
    private readonly missionDeleteService: MissionDeleteService,
    private readonly finishMissionService: FinishMissionUserService,
  ) {}

  /**
   * Buscar dados de todas as missões cadastradas na base de dados
   * @param dto Filtros e paginação
   * @returns Dados das missões paginados
   */
  @Get()
  findAll(@Query() dto: MissionFindManyDto): Promise<MissionEntity[]> {
    return this.missionFindManyService.execute(dto);
  }

  /**
   * Buscar uma missão com base em seu ID
   * @param id ID da missão
   * @returns Dados da missão
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MissionEntity> {
    return this.missionFindOneService.execute(id);
  }

  /**
   * Criar nova missão associada á uma instituição
   * @param dto Dados da missão para serem cadastrados
   * @returns Dados da missão na base de dados
   */
  @Post()
  @AllowedTypes('INSTITUTION')
  create(
    @Body() dto: MissionCreateDto,
    @User() user: CorporationEntity,
  ): Promise<MissionEntity> {
    return this.missionCreateService.execute(dto, user.id);
  }

  /**
   * Atualizar
   * @param id
   * @param dto
   * @returns
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MissionUpdateDto,
  ): Promise<MissionEntity> {
    return this.missionUpdateService.execute(id, dto);
  }

  /**
   * Finalizar missão
   */
  @Patch(':id/finish')
  @AllowedTypes('PLAYER')
  finishMission(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
    @Body() dto: FinishMissionUserDTO,
  ) {
    return this.finishMissionService.execute(id, user, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<MissionEntity> {
    return this.missionDeleteService.execute(id);
  }
}
