import { PointsLog } from '@prisma/client';

export default class PointsLogEntity implements PointsLog {
  missionId: number;
  userId: number;
  points: number;
  createdAt: Date;
  id: number;

  public constructor(data: Partial<PointsLog>) {
    Object.assign(this, data);
  }
}
