import { PaginationRequestDto } from '@shared/dtos/pagination';

export class MissionFindManyDto extends PaginationRequestDto {
  name: string;
}
