import { IAirplane } from "./airplane-interface";
import { IAirport } from "./airport-interface";
import { IAirportTransit } from "./airport-transit-interface";
import { IFlightTicket } from "./flight-ticket-interface";

export interface IFlight {
  ID?: number;
  AirplaneID?: number;
  Airplane?: IAirplane;
  OriginAirportID?: number;
  OriginAirport?: IAirport;
  DestinationAirportID?: number;
  DestinationAirport?: IAirport;
  AirportTransits?: IAirportTransit[];
  FlightTickets?: IFlightTicket[];
  FlightCode: string;
  DepartureDate: string;
  ArrivalDate: string;
  FlightPrice: string;
}
