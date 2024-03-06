import { IRoom } from "./room-interface";
import { IUser } from "./user-interface";

export interface IHotelBooking {
  ID?: number;
  UserID?: number;
  User?: IUser;
  RoomID?: number;
  Room?: IRoom;
  CheckInDate: string;
  CheckOutDate: string;
  Status: string;
  IsReviewed: boolean;
}
