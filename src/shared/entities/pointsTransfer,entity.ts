import { PointsTransfer } from '@prisma/client';

export default class PointsTransferEntity implements PointsTransfer {
  id: number;
  institutionId: number;
  sponsorId: number;
  points: number;
  createdAt: Date;

  public constructor(data: Partial<PointsTransfer>) {
    Object.assign(this, data);
  }
}
