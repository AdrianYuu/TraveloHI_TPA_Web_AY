import { IRoom } from "./room-interface";

export interface IRoomPicture {
  ID?: number;
  RoomID?: number;
  Room?: IRoom;
  URL: string;
}
