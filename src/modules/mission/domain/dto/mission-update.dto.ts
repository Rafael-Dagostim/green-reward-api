import { PartialType } from '@nestjs/swagger';
import { MissionCreateDto } from './mission-create.dto';

export class MissionUpdateDto extends PartialType(MissionCreateDto) {}
