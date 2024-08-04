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
import { MissionCreateDto } from './domain/dto/mission-create.dto';
import { MissionFindManyDto } from './domain/dto/mission-find-many.dto';
import { MissionUpdateDto } from './domain/dto/mission-update.dto';
import { MissionEntity } from './domain/entities/mission.entity';
import { MissionCreateService } from './services/mission-create.service';
import { MissionDeleteService } from './services/mission-delete.service';
import { MissionFindManyService } from './services/mission-find-many.service';
import { MissionFindOneService } from './services/mission-find-one.service';
import { MissionUpdateService } from './services/mission-update.service';

@ApiTags('mission')
@Controller('mission')
export class MissionController {
  constructor(
    private readonly missionFindManyService: MissionFindManyService,
    private readonly missionFindOneService: MissionFindOneService,
    private readonly missionCreateService: MissionCreateService,
    private readonly missionUpdateService: MissionUpdateService,
    private readonly missionDeleteService: MissionDeleteService,
  ) {}

  @Get()
  findAll(@Query() dto: MissionFindManyDto): Promise<MissionEntity[]> {
    return this.missionFindManyService.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MissionEntity> {
    return this.missionFindOneService.execute(id);
  }

  @Post()
  create(@Body() dto: MissionCreateDto): Promise<MissionEntity> {
    return this.missionCreateService.execute(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MissionUpdateDto,
  ): Promise<MissionEntity> {
    return this.missionUpdateService.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<MissionEntity> {
    return this.missionDeleteService.execute(id);
  }
}
