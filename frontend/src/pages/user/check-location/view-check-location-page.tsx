import styled from "@emotion/styled";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import FileInputForm from "./../../../components/file-input-form";
import { useState } from "react";
import axios from "axios";
import { IFlight } from "../../../interfaces/flight-interface";
import { IHotel } from "../../../interfaces/hotel-interface";
import { getFlightsByCountryName } from "../../../api/api-flight";
import { getHotelsByCountryName } from "../../../api/api-hotel";
import { calculateDuration } from "../../../utils/util";
import useLanguage from "../../../contexts/language-context";
import { useNavigate } from "react-router-dom";
import NoImageIcon from "../../../assets/No_Image_Icon.jpg";
import LocationIcon from "../../../assets/Location_Icon.png";
import StarIcon from "../../../assets/Star_Icon.png";
import { IHotelReview } from "../../../interfaces/hotel-review-interface";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: #309cd4;
  min-height: 50rem;
`;

const Form = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 50rem;
  max-height: 8rem;
  margin-top: 2rem;
`;

const SubmitButton = styled.button`
  border-radius: 0.5rem;
  font-weight: 600;
  background-color: #ff5c1c;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  padding: 0.8rem;

  &:hover {
    background-color: #e0440c;
  }
`;

const FlightCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 50rem;
  gap: 1.5rem;
`;

const AirlineContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 12rem;
`;

const AirlineLogo = styled.img`
  width: 4rem;
  height: 4rem;
`;

const AirlineName = styled.p``;

const TimeContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const PriceContainerFlight = styled.div`
  display: flex;
  min-width: 8rem;
  justify-content: end;
  padding: 1rem;
`;

const PriceContainerHotel = styled.div`
  display: flex;
  min-width: 8rem;
  flex-direction: column;
  justify-content: end;
  padding: 1rem;
  gap: 1rem;
`;

const FlightInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

const Time = styled.p`
  color: black;
  font-weight: 600;
  font-size: 1rem;
`;

const Location = styled.p`
  color: #687279;
  font-weight: 400;
  font-size: 0.8rem;
`;

const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LineContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LineContainerV = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Line = styled.div`
  width: 4rem;
  height: 0.1rem;
  background-color: black;
`;

const LineV = styled.div`
  width: 0.1rem;
  min-height: 15rem;
  background-color: black;
`;

const Circle = styled.div`
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  background-color: black;
`;

const Price = styled.p`
  color: #ff672c;
  font-weight: 600;
  font-size: 1rem;
`;

const PerPerson = styled.p`
  color: #687279;
  font-size: 1rem;
`;

const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const TransitCount = styled.p``;

const ChooseButton = styled.button`
  width: 100%;
  border-radius: 0.5rem;
  font-weight: 600;
  background-color: #ff5c1c;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  padding: 0.8rem;

  &:hover {
    background-color: #e0440c;
  }

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #ccc;
    cursor: not-allowed;
    &:hover {
      background-color: #ccc;
    }
  `}
`;

const Duration = styled.p``;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailButton = styled.button`
  background-color: white;
  cursor: pointer;
  color: #687279;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const AddButton = styled.button`
  height: 2.5rem;
  border-radius: 0.4rem;
  font-weight: 600;
  background-color: #2074f4;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 3rem;

  &:hover {
    background-color: #086cdc;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const BottomTimeContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  align-items: center;
`;

const LeftDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RightDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CityInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const CityName = styled.p`
  font-size: 1rem;
  color: black;
  font-weight: 600;
`;

const AirportName = styled.p`
  font-size: 0.8rem;
  color: #687279;
`;

const NoMessage = styled.p`
  color: white;
`;

const HotelCard = styled.div`
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  background-color: white;
  max-width: 54rem;
`;

const HotelName = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;

const HotelImage = styled.img`
  width: 15rem;
  min-height: 11rem;
  border-radius: 0.5rem 0 0 0;
`;

const HotelContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HotelImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HotelImageBottomContainer = styled.div`
  display: flex;
  width: 100%;
`;

const HotelImageLittle = styled.img`
  width: 5rem;
  background-color: red;
  min-height: 4rem;
`;

const HotelImageLittleRadius = styled.img`
  width: 5rem;
  border-radius: 0 0 0 0.5rem;
  background-color: red;
`;

const HotelLocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  max-width: 30rem;
  margin-top: 1rem;
`;

const HotelFacilityContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 30rem;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const FacilityName = styled.span`
  background-color: #0ca8e8;
  color: white;
  border-radius: 0.5rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
`;

const PriceText = styled.p`
  text-align: end;
  color: #ff5c1c;
  font-weight: 600;
  font-size: 1.2rem;
`;

const HotelStarContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
`;

const AverageRating = styled.p`
  margin-top: 0.5rem;
`;

const HotelStar = styled.img`
  width: 1rem;
`;

const LocationImg = styled.img`
  width: 1rem;
`;

const ButtonContainer = styled.div``;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ResultText = styled.p`
  font-weight: 600;
  text-align: center;
  color: white;
  font-size: 4rem;
`;

const Date = styled.p``;

const ViewCheckLocationPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [flights, setFlights] = useState<IFlight[] | null>(null);
  const [hotels, setHotels] = useState<IHotel[] | null>(null);
  const { formatCurrency } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>("");

  const toggleDropdown = (flightIndex: number) => {
    setActiveDropdown((prevIndex: number | null) =>
      prevIndex === flightIndex ? null : flightIndex
    );
  };

  const isDropdownVisible = (flightIndex: number) => {
    return activeDropdown === flightIndex;
  };

  const handleFileInputChange = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/get-predict-result",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data.predicted_country;
      fetchFlight(result);
      fetchHotel(result);
      setLocation(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const calculateAverageRating = (
    reviews: IHotelReview[] | undefined
  ): number => {
    let totalRating = 0;
    let numberOfReviews = 0;

    if (reviews && reviews.length > 0) {
      reviews.forEach((review) => {
        const cleanlinessRating = review.HotelRatings?.find(
          (rating) =>
            rating.HotelRatingType?.HotelRatingTypeName === "Cleanliness"
        )?.Rating;
        const comfortRating = review.HotelRatings?.find(
          (rating) => rating.HotelRatingType?.HotelRatingTypeName === "Comfort"
        )?.Rating;
        const locationRating = review.HotelRatings?.find(
          (rating) => rating.HotelRatingType?.HotelRatingTypeName === "Location"
        )?.Rating;
        const serviceRating = review.HotelRatings?.find(
          (rating) => rating.HotelRatingType?.HotelRatingTypeName === "Service"
        )?.Rating;

        const averageRating =
          (cleanlinessRating! +
            comfortRating! +
            locationRating! +
            serviceRating!) /
          4;

        if (!isNaN(averageRating)) {
          totalRating += averageRating;
          numberOfReviews++;
        }
      });
    }

    return numberOfReviews > 0 ? totalRating / numberOfReviews : 0;
  };

  const getCheapestRoom = (hotel: IHotel): string => {
    const rooms = hotel.Rooms;
    if (rooms && rooms.length > 0) {
      let minPrice = parseInt(rooms[0].RoomPrice);
      for (let i = 1; i < rooms.length; i++) {
        if (parseInt(rooms[i].RoomPrice) < minPrice) {
          minPrice = parseInt(rooms[i].RoomPrice);
        }
      }
      return `${formatCurrency(minPrice)}`;
    }
    return "No Room";
  };

  const fetchFlight = async (result: string) => {
    setFlights(await getFlightsByCountryName(result));
  };

  const fetchHotel = async (result: string) => {
    setHotels(await getHotelsByCountryName(result));
  };

  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <FileInputForm
              label="Input your image of a location!"
              value={file}
              onChange={handleFileInputChange}
            />
            <SubmitButton type="submit">Upload</SubmitButton>
          </Form>
          <ResultText>{location}</ResultText>
          <ResultContainer>
            {flights && flights.length > 0 ? (
              flights.map((flight, index) => (
                <FlightCard>
                  <UpperContainer>
                    <AirlineContainer>
                      <AirlineLogo
                        src={flight.Airplane?.Airline?.AirlinePictureURL}
                      />
                      <AirlineName>
                        {flight.Airplane?.Airline?.AirlineName} -{" "}
                        {flight.FlightCode}
                      </AirlineName>
                    </AirlineContainer>
                    <TimeContainer>
                      <FlightInformation>
                        <Time>{flight.DepartureDate.split(" ")[1]}</Time>
                        <Location>{flight.OriginAirport?.AirportCode}</Location>
                      </FlightInformation>
                      <MiddleContainer>
                        <Duration>
                          {calculateDuration(
                            flight.DepartureDate,
                            flight.ArrivalDate
                          )}
                        </Duration>
                        <LineContainer>
                          <Circle />
                          <Line />
                          <Circle />
                        </LineContainer>
                        <TransitCount>
                          {flight.AirportTransits?.length === 0 ? (
                            <>Direct</>
                          ) : (
                            flight.AirportTransits?.length + " transit"
                          )}
                        </TransitCount>
                      </MiddleContainer>
                      <FlightInformation>
                        <Time>{flight.ArrivalDate.split(" ")[1]}</Time>
                        <Location>
                          {flight.DestinationAirport?.AirportCode}
                        </Location>
                      </FlightInformation>
                    </TimeContainer>
                    <PriceContainerFlight>
                      <Price>
                        {formatCurrency(parseInt(flight.FlightPrice))}
                      </Price>
                      <PerPerson>/person</PerPerson>
                    </PriceContainerFlight>
                  </UpperContainer>
                  <BottomContainer>
                    <DetailButton onClick={() => toggleDropdown(index)}>
                      Detail
                    </DetailButton>
                    <AddButton
                      onClick={() =>
                        navigate(`/view-flight-detail/${flight.ID}`)
                      }
                    >
                      Choose
                    </AddButton>
                  </BottomContainer>
                  {isDropdownVisible(index) && (
                    <DropdownContainer>
                      <LeftDropdownContainer>
                        <BottomTimeContainer>
                          <Time>{flight.DepartureDate.split(" ")[1]}</Time>
                          <Date>{flight.DepartureDate.split(" ")[0]}</Date>
                        </BottomTimeContainer>
                        <LineContainerV>
                          <Circle />
                          <LineV />
                          <Circle />
                        </LineContainerV>
                        <BottomTimeContainer>
                          <Time>{flight.ArrivalDate.split(" ")[1]}</Time>
                          <Date>{flight.ArrivalDate.split(" ")[0]}</Date>
                        </BottomTimeContainer>
                      </LeftDropdownContainer>
                      <RightDropdownContainer>
                        <CityInformation>
                          <CityName>
                            {flight.OriginAirport?.City.CityName}
                          </CityName>
                          <AirportName>
                            {flight.OriginAirport?.AirportName}
                          </AirportName>
                        </CityInformation>
                        {flight.AirportTransits?.map((transit) => (
                          <CityInformation>
                            <CityName>
                              {transit.Airport?.City.CityName}
                            </CityName>
                            <AirportName>
                              {transit.Airport?.AirportName}
                            </AirportName>
                          </CityInformation>
                        ))}
                        <CityInformation>
                          <CityName>
                            {flight.DestinationAirport?.City.CityName}
                          </CityName>
                          <AirportName>
                            {flight.DestinationAirport?.AirportName}
                          </AirportName>
                        </CityInformation>
                      </RightDropdownContainer>
                    </DropdownContainer>
                  )}
                </FlightCard>
              ))
            ) : (
              <NoMessage>No flights available.</NoMessage>
            )}
            {hotels && hotels.length > 0 ? (
              hotels.map((hotel, index) => (
                <HotelCard key={index}>
                  <HotelImageContainer>
                    <HotelImage src={hotel.HotelPictures?.[0]?.URL} />
                    <HotelImageBottomContainer>
                      <HotelImageLittleRadius
                        src={hotel.HotelPictures?.[1]?.URL || NoImageIcon}
                        alt="Hotel Image"
                      />
                      <HotelImageLittle
                        src={hotel.HotelPictures?.[2]?.URL || NoImageIcon}
                        alt="Hotel Image"
                      />
                      <HotelImageLittle
                        src={hotel.HotelPictures?.[3]?.URL || NoImageIcon}
                        alt="Hotel Image"
                      />
                    </HotelImageBottomContainer>
                  </HotelImageContainer>
                  <HotelContainer>
                    <HotelName>{hotel.HotelName}</HotelName>
                    <HotelStarContainer>
                      {Array.from({ length: parseInt(hotel.HotelStar) }).map(
                        (_, index) => (
                          <HotelStar key={index} src={StarIcon} />
                        )
                      )}
                    </HotelStarContainer>
                    <AverageRating>
                      {"Average Rating : "}
                      {calculateAverageRating(hotel.HotelReviews)}
                    </AverageRating>
                    <HotelLocationContainer>
                      <LocationImg src={LocationIcon} />
                      {hotel.HotelAddress} - {hotel.Country?.CountryName}
                    </HotelLocationContainer>
                    {hotel.HotelFacilities &&
                    hotel.HotelFacilities?.length > 0 ? (
                      <HotelFacilityContainer>
                        {hotel.HotelFacilities.map((facility) => (
                          <FacilityName key={facility.ID}>
                            {facility.FacilityName}
                          </FacilityName>
                        ))}
                      </HotelFacilityContainer>
                    ) : (
                      <NoMessage>No facility.</NoMessage>
                    )}
                  </HotelContainer>
                  <PriceContainerHotel>
                    <PriceText>{getCheapestRoom(hotel)}</PriceText>
                    <ButtonContainer>
                      <ChooseButton
                        disabled={getCheapestRoom(hotel) === "No Room"}
                        onClick={() =>
                          navigate(`/view-hotel-detail/${hotel.ID}`)
                        }
                      >
                        Choose Room
                      </ChooseButton>
                    </ButtonContainer>
                  </PriceContainerHotel>
                </HotelCard>
              ))
            ) : (
              <NoMessage>No hotels available.</NoMessage>
            )}
          </ResultContainer>
        </Wrapper>
      </InnerContainer>
      <Footer />
    </Container>
  );
};

export default ViewCheckLocationPage;
