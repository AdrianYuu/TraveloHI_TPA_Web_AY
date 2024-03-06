import { IHotel } from "./hotel-interface";

export interface IHotelFacility {
  ID?: number;
  FacilityName: string;
  Hotels?: IHotel[];
}
