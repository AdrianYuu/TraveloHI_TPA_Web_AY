import { IAirport } from "./airport-interface";
import { IFlight } from "./flight-interface";

export interface IAirportTransit {
  ID?: number;
  AirportID?: number;
  Airport?: IAirport;
  FlightID?: number;
  Flight?: IFlight;
}
