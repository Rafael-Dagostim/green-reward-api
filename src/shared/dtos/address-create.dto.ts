export class AddressCreateDto {
  postcode: string;
  state: string;
  city: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  complement?: string;
}
