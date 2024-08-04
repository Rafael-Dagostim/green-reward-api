import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { AddressEntity } from '@shared/entities/address.entity';
import { StoredFileEntity } from '@shared/entities/stored-files.entity';

export class UserEntity implements User {
  id: number;

  username: string;
  birthDate: Date;
  document: string;
  email: string;
  @Exclude()
  password: string;
  @Exclude()
  salt: string;
  phone: string;
  socialMedia: string;
  totalPoints: number;
  alternativePhone: string;
  type: $Enums.UserType;

  avatarId: number;
  avatar?: StoredFileEntity;

  addressId: number;
  address?: AddressEntity;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    const address = partial.address && new AddressEntity(partial.address);
    const avatar = partial.address && new StoredFileEntity(partial.avatar);

    Object.assign(this, { ...partial, address, avatar });
  }
}
