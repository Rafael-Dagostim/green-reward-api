import { PartialType } from '@nestjs/swagger';
import { CorporationCreateDto } from './corporation-create.dto';

export class CorporationUpdateDto extends PartialType(CorporationCreateDto) {}
