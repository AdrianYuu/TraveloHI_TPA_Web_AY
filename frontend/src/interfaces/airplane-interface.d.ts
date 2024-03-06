import { IAirline } from "./airline-interface";

export interface IAirplane {
  ID?: number;
  AirlineID?: number;
  Airline?: IAirline;
  AirplaneName: string;
}
