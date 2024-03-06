import { IHotel } from "./hotel-interface";

export interface IHotelPicture {
  ID?: number;
  HotelID?: number;
  Hotel?: IHotel;
  URL: string;
}
