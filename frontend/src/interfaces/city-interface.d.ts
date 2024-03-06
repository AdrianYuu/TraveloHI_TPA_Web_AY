import { ICountry } from "./country-interface";

export interface ICity {
  ID: number;
  CountryID?: number;
  Country?: ICountry;
  CityName: string;
  Airports?: Airport[];
}
