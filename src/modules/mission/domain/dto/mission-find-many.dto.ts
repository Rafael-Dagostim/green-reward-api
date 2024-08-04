import { PaginationRequestDto } from 'src/shared/dtos/pagination';

export class MissionFindManyDto extends PaginationRequestDto {
  name: string;
}
