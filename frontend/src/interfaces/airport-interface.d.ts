import { ICity } from "./city-interface";

export interface IAirport {
  ID?: number;
  CityID?: number;
  City: ICity;
  AirportName: string;
  AirportCode: string;
}
