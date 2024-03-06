import { ICountry } from "./country-interface";
import { IHotelFacility } from "./hotel-facility-interface";
import { IHotelPicture } from "./hotel-picture-interface";
import { IHotelReview } from "./hotel-review-interface";
import { IRoom } from "./room-interface.d";

export interface IHotel {
  ID?: number;
  HotelName: string;
  HotelDescription: string;
  HotelAddress: string;
  HotelStar: string;
  HotelPictures?: IHotelPicture[];
  HotelFacilities?: IHotelFacility[];
  HotelReviews?: IHotelReview[];
  Rooms?: IRoom[];
  CountryID?: number;
  Country?: ICountry;
  SelectedFacility?: number;
  HotelPictureLength?: number;
}
