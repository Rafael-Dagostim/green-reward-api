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
import { UserCreateDto } from '../domain/dto/user-create.dto';
import { UserFindManyDto } from '../domain/dto/user-find-many.dto';
import { UserUpdateDto } from '../domain/dto/user-update.dto';
import { UserEntity } from '../domain/entities/user.entity';
import { UserCreateService } from '../services/user-create.service';
import { UserDeleteService } from '../services/user-delete.service';
import { UserFindManyService } from '../services/user-find-many.service';
import { UserFindOneService } from '../services/user-find-one.service';
import { UserUpdateService } from '../services/user-update.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userFindManyService: UserFindManyService,
    private readonly userFindOneService: UserFindOneService,
    private readonly userCreateService: UserCreateService,
    private readonly userUpdateService: UserUpdateService,
    private readonly userDeleteService: UserDeleteService,
  ) {}

  @Get()
  findAll(@Query() dto: UserFindManyDto): Promise<UserEntity[]> {
    return this.userFindManyService.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userFindOneService.execute(id);
  }

  @Post()
  create(@Body() dto: UserCreateDto): Promise<UserEntity> {
    return this.userCreateService.execute(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UserUpdateDto): Promise<UserEntity> {
    return this.userUpdateService.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userDeleteService.execute(id);
  }
}