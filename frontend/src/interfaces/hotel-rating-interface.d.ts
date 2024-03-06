import { IHotelRatingType } from "./hotel-rating-type-interface";

export interface IHotelRating {
  ID?: number;
  HotelReviewID?: number;
  HotelReview?: IHotelReview;
  HotelRatingTypeID?: number;
  HotelRatingType?: IHotelRatingType;
  Rating: number;
}
