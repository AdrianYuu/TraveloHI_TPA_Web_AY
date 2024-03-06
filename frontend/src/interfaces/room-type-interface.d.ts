import { IRoom } from "./room-interface";

export interface IRoomType {
  ID?: number;
  RoomTypeName: string;
  Rooms?: IRoom[];
}
