import { IRoom } from "./room-interface";

export interface IRoomFacility {
  ID?: number;
  FacilityName: string;
  Rooms?: IRoom[];
}
