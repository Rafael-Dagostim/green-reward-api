import { applyDecorators } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

interface IsIdOptions {
  isOptional?: boolean;
}

export const IsId = (options?: IsIdOptions): PropertyDecorator => {
  const decorators = [
    Transform(({ value }) => (value ? value : undefined)),
    Type(() => Number),
    IsInt(),
    Min(1),
  ];
  if (options?.isOptional) decorators.unshift(IsOptional());

  return applyDecorators(...decorators);
};
