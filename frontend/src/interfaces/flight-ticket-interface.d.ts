import { IFlight } from "./flight-interface";
import { ISeat } from "./seat-interface";
import { IUser } from "./user-interface";

export interface IFlightTicket {
  ID?: number;
  UserID?: number;
  User?: IUser;
  FlightID?: number;
  Flight?: IFlight;
  Seats?: ISeat[];
  SelectedSeat: number;
  IsLuggage: boolean;
  Status: string;
}
