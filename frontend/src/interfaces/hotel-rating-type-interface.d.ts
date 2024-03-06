import { IHotelRating } from "./hotel-rating-interface";

export interface IHotelRatingType {
  ID?: number;
  HotelRatingTypeName: string;
  HotelRatings?: IHotelRating[];
}
