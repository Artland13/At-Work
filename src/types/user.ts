export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: IAddress;
  company: ICompany;
  isArchived: boolean;
  isHidden: boolean;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUserCardData {
  id: number;
  username: string;
  city: string;
  companyName: string;
  isArchived?: boolean;
}

export type IUserUpdatePayload = Partial<Omit<IUser, 'id'>>;