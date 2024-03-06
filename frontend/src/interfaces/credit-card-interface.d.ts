import { IUser } from "./user-interface";

export interface ICreditCard {
  ID?: number;
  UserID?: number;
  User?: IUser;
  BankName: string;
  CardNumber: string;
  CVV: string;
  ExpiryDate: string;
}
