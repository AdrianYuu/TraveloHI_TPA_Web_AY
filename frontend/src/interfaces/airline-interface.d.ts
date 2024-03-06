import { IAirplane } from "./airplane-interface";

export interface IAirline {
  ID?: number;
  AirlineName: string;
  AirlineDescription: string;
  AirlinePictureURL: string;
  Airplanes?: IAirplane[];
}
