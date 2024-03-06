export interface IUser {
  ID?: number;
  FirstName: string;
  LastName: string;
  Email: string;
  DateOfBirth: string;
  Password?: string;
  ConfirmPassword?: string;
  Gender: string;
  ProfilePictureURL: string;
  RoleID: number;
  IsBanned: boolean;
  IsSubscribed: boolean;
  WalletBalance?: number;
  OTPCode?: string;
  Points?: number;
  UnAnsweredQuestion?: number;
  Address?: string;
  PhoneNumber?: string;
  IsLogin?: bool;
}
