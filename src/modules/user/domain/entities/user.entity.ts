import { $Enums, User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  addressId: number;
  avatarId: number;
  userName: string;
  document: string;
  email: string;
  password: string;
  phone: string;
  socialMedia: string;
  totalPoints: number;
  type: $Enums.UserType;
  alternativePhone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  //   constructor(partial: DeepPartial<UserEntity>) {
  //     const files = (partial.files =
  //       partial.files?.map((file) => new CompanyFileEntity(file as CompanyFileEntity)) ?? []);
  //     Object.assign(this, { ...partial, files });
  //   }
}
