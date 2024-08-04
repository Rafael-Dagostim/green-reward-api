import { NotFoundException } from '@nestjs/common';

export class NotEnoughPointsException extends NotFoundException {
  constructor(entityOrObjectName: string, referenceField?: string, referenceValue?: any) {
    const message =
      referenceField && referenceValue
        ? `${entityOrObjectName} com ${referenceField.toString()} igual à ${referenceValue} não encontrado(a)`
        : `${entityOrObjectName} não encontrado(a)`;
    super(null, message);
  }
}
