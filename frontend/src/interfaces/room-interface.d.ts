import { IHotel } from "./hotel-interface";
import { IRoomFacility } from "./room-facility-interface";
import { IRoomPicture } from "./room-picture-interface";
import { IRoomType } from "./room-type-interface";

export interface IRoom {
  ID?: number;
  HotelID?: number;
  Hotel?: IHotel;
  RoomPrice: string;
  RoomTypeID?: number;
  RoomType?: IRoomType;
  RoomFacilities?: IRoomFacility[];
  RoomPictures?: IRoomPicture[];
  RoomPictureLength?: number;
}
