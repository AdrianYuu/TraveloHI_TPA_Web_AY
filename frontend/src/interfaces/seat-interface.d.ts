import { IFlightTicket } from "./flight-ticket-interface";

export interface ISeat {
  ID?: number;
  FlightTicketID?: number;
  FlightTicket?: IFlightTicket;
  SeatClass: string;
  SeatNumber: string;
}
