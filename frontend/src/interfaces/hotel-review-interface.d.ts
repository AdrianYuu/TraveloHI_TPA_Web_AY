import { IHotel } from "./hotel-interface";
import { IHotelRating } from "./hotel-rating-interface";

export interface IHotelReview {
  ID?: number;
  Name: string;
  HotelID?: number;
  Hotel?: IHotel;
  HotelRatings?: IHotelRating[];
  Review: string;
}
