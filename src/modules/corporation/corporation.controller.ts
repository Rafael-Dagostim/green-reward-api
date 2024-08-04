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

@ApiTags('corporation')
@Controller('corporation')
export class CorporationController {
  constructor(
    private readonly corporationFindManyService: CorporationFindManyService,
    private readonly corporationFindOneService: CorporationFindOneService,
    private readonly corporationCreateService: CorporationCreateService,
    private readonly corporationUpdateService: CorporationUpdateService,
    private readonly corporationDeleteService: CorporationDeleteService,
  ) {}

  @Get()
  findAll(@Query() dto: CorporationFindManyDto): Promise<CorporationEntity[]> {
    return this.corporationFindManyService.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CorporationEntity> {
    return this.corporationFindOneService.execute(id);
  }

  @Post()
  create(@Body() dto: CorporationCreateDto): Promise<CorporationEntity> {
    return this.corporationCreateService.execute(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CorporationUpdateDto,
  ): Promise<CorporationEntity> {
    return this.corporationUpdateService.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<CorporationEntity> {
    return this.corporationDeleteService.execute(id);
  }
}
