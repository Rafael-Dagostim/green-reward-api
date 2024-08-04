import { Address } from '@prisma/client';

export class AddressEntity implements Address {
  id: number;

  postcode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
