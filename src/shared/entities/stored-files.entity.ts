import { StoredFile } from '@prisma/client';

export class StoredFileEntity implements StoredFile {
  id: number;
  name: string;
  path: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(partial: Partial<StoredFileEntity>) {
    Object.assign(this, partial);
  }
}
