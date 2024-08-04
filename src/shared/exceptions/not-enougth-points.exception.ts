import { NotFoundException } from '@nestjs/common';

export class NotEnoughPointsException extends NotFoundException {
  constructor(currentPoints: number, missingPoints: number) {
    const message = `Você não tem pontos suficientes, voce possui ${currentPoints} faltam ${missingPoints}`;
    super(null, message);
  }
}
