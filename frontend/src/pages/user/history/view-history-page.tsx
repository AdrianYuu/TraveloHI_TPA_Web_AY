import styled from "@emotion/styled";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useEffect, useState } from "react";
import { IFlightTicket } from "../../../interfaces/flight-ticket-interface";
import useUser from "../../../contexts/user-context";
import { getFlightTicketsPaid } from "../../../api/api-flight-ticket";
import { IHotelBooking } from "../../../interfaces/hotel-booking-interface";
import {
  getHotelBookingsPaid,
  updateHotelBookingReviewStatus,
} from "../../../api/api-hotel-booking";
import useLanguage from "../../../contexts/language-context";
import { calculateDuration, calculateTotalDays } from "../../../utils/util";
import { IFlight } from "../../../interfaces/flight-interface";
import { ISeat } from "../../../interfaces/seat-interface";
import InputForm from "./../../../components/input-form";
import StarIcon from "../../../assets/Star_Icon.png";
import CheckboxInputForm from "../../../components/checkbox-input-form";
import { IHotelReview } from "../../../interfaces/hotel-review-interface";
import { createHotelReview } from "../../../api/api-hotel-review";
import { HttpStatusCode } from "axios";
import { createHotelRating } from "../../../api/api-hotel-rating";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f7f9fa;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100%;
  padding: 2rem;
  background-color: #f7f9fa;
`;

const HistoryContainer = styled.div`
  display: flex;
  min-width: 80rem;
  flex-direction: column;
  gap: 2rem;
`;

const HistoryTitle = styled.p`
  font-weight: 600;
  font-size: 2rem;
`;

const FlightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HotelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

const HotelCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 60rem;
  gap: 1.5rem;
`;

const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const AirlineName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;

const TimeContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 12rem;
  justify-content: right;
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

const Duration = styled.p``;

const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
`;

const TransitCount = styled.p``;

const LineContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  width: 4rem;
  height: 0.1rem;
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
  font-size: 1.8rem;
`;

const RoomImage = styled.img`
  width: 15rem;
  height: 15rem;
`;

const NoMessage = styled.p`
  color: #555;
`;

const RoomInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RoomInfoContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const SeatContainer = styled.div``;

const Seat = styled.p`
  margin-bottom: 0.5rem;
`;

const SeatTitle = styled.p`
  font-weight: 600;
  margin-bottom: 1rem;
`;

const HotelName = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;

const CheckContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  gap: 1rem;
`;

const HotelStarContainer = styled.div`
  margin-top: 0.5rem;
`;

const HotelStar = styled.img`
  width: 1.4rem;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  align-items: center;
  margin-top: 1.2rem;
`;

const DayContainer = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ReviewButton = styled.button`
  border-radius: 0.5rem;
  margin-top: 1rem;
  font-weight: 600;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#ff5c1c")};
  color: ${({ disabled }) => (disabled ? "#888" : "white")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  padding: 0.8rem;
  width: 8rem;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#e0440c")};
  }
`;

const DropDownContainer = styled.div``;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
  font-size: 1rem;
  min-height: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ViewHistoryPage = () => {
  const { user } = useUser();
  const { formatCurrency } = useLanguage();

  const [flightTicket, setFlightTicket] = useState<IFlightTicket[] | null>(
    null
  );

  const [hotelBooking, setHotelBooking] = useState<IHotelBooking[] | null>(
    null
  );

  const [clean, setClean] = useState<string>("");
  const [comfort, setComfort] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [review, setReview] = useState<string>("");

  const [isHotel, setIsHotel] = useState<boolean>(true);
  const [isFlight, setIsFlight] = useState<boolean>(true);

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const [isAnonymous, setAnonymous] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [searchValue, setSearchValue] = useState<string>("");

  const handleHotelToggle = () => {
    setIsHotel(!isHotel);
  };

  const handleFlightToggle = () => {
    setIsFlight(!isFlight);
  };

  useEffect(() => {
    fetchTicket();
    fetchBooking();
  }, [user]);

  const calculateFlightPrice = (flight: IFlight, seats: ISeat[]) => {
    let totalPrice = 0;
    seats.forEach((seat) => {
      if (seat.SeatClass === "Business") {
        totalPrice += parseInt(flight.FlightPrice) * 1.5;
      } else if (seat.SeatClass === "Economy") {
        totalPrice += parseInt(flight.FlightPrice);
      }
    });
    return totalPrice;
  };

  const fetchTicket = async () => {
    const validFlightTickets = await getFlightTicketsPaid(user?.ID ?? -1);
    if (validFlightTickets) {
      const filteredTickets = validFlightTickets.filter(
        (flight) => new Date(flight?.Flight?.DepartureDate ?? "") < new Date()
      );
      setFlightTicket((prevTickets) =>
        prevTickets ? [...prevTickets, ...filteredTickets] : filteredTickets
      );
    }
  };

  const fetchBooking = async () => {
    const validHotelBookings = await getHotelBookingsPaid(user?.ID ?? -1);
    if (validHotelBookings) {
      const filteredBookings = validHotelBookings.filter(
        (booking) => new Date(booking?.CheckInDate ?? "") < new Date()
      );
      setHotelBooking((prevBookings) =>
        prevBookings ? [...prevBookings, ...filteredBookings] : filteredBookings
      );
    }
  };

  const toggleDropdown = (flightIndex: number) => {
    setActiveDropdown((prevIndex: number | null) =>
      prevIndex === flightIndex ? null : flightIndex
    );
  };

  const isDropdownVisible = (flightIndex: number) => {
    return activeDropdown === flightIndex;
  };

  const filteredFlightTickets = flightTicket?.filter((ticket) =>
    ticket.Flight?.Airplane?.Airline?.AirlineName.toLowerCase().includes(
      searchValue.toLowerCase()
    )
  );

  const filteredHotelBookings = hotelBooking?.filter((booking) =>
    booking.Room?.Hotel?.HotelName.toLowerCase().includes(
      searchValue.toLowerCase()
    )
  );

  const handleSubmit = async (HotelID: number, HotelBookingID: number) => {
    setError("");

    const HotelReview: IHotelReview = {
      HotelID: HotelID,
      Name: isAnonymous ? "" : user?.FirstName + " " + user?.LastName,
      Review: review,
    };

    if (parseInt(clean) < 1 || parseInt(clean) > 5) {
      setError("Rating must be 1 - 5.");
      return;
    }

    if (parseInt(comfort) < 1 || parseInt(comfort) > 5) {
      setError("Rating must be 1 - 5.");
      return;
    }

    if (parseInt(location) < 1 || parseInt(location) > 5) {
      setError("Rating must be 1 - 5.");
      return;
    }

    if (parseInt(service) < 1 || parseInt(service) > 5) {
      setError("Rating must be 1 - 5.");
      return;
    }

    const response = await createHotelReview(HotelReview);

    if (response?.StatusCode === HttpStatusCode.Ok) {
      const HotelReviewID = response.Message;

      if (HotelReviewID != null) {
        const createHotelRatingPromises = [
          createHotelRating({
            HotelReviewID: parseInt(HotelReviewID),
            HotelRatingTypeID: 1,
            Rating: parseInt(clean),
          }),
          createHotelRating({
            HotelReviewID: parseInt(HotelReviewID),
            HotelRatingTypeID: 2,
            Rating: parseInt(comfort),
          }),
          createHotelRating({
            HotelReviewID: parseInt(HotelReviewID),
            HotelRatingTypeID: 3,
            Rating: parseInt(location),
          }),
          createHotelRating({
            HotelReviewID: parseInt(HotelReviewID),
            HotelRatingTypeID: 4,
            Rating: parseInt(service),
          }),
        ];

        await Promise.all(createHotelRatingPromises);
        await updateHotelBookingReviewStatus(HotelBookingID);
        window.location.reload();
      }
    } else {
      setError(response?.Message ?? "Error");
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (bottom) {
        fetchTicket();
        fetchBooking();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container>
      <Navbar onSearch={handleSearch} />
      <InnerContainer>
        <HistoryContainer>
          <HistoryTitle>My Ticket and Hotel History</HistoryTitle>
          {(filteredFlightTickets && filteredFlightTickets.length > 0) ||
          (filteredHotelBookings && filteredHotelBookings.length > 0) ? (
            <>
              <FilterContainer>
                <CheckboxInputForm
                  label="Flight Ticket"
                  checked={isFlight}
                  onChange={() => handleFlightToggle()}
                />
                <CheckboxInputForm
                  label="Hotel Booking"
                  checked={isHotel}
                  onChange={() => handleHotelToggle()}
                />
              </FilterContainer>
              {isFlight && (
                <FlightContainer>
                  {filteredFlightTickets?.map((flight, index) => (
                    <FlightCard key={index}>
                      <UpperContainer>
                        <AirlineContainer>
                          <AirlineLogo
                            src={
                              flight.Flight?.Airplane?.Airline
                                ?.AirlinePictureURL
                            }
                          />
                          <AirlineName>
                            {flight.Flight?.Airplane?.Airline?.AirlineName} -{" "}
                            {flight.Flight?.FlightCode} -{" "}
                            {flight.Flight?.Airplane?.AirplaneName}
                          </AirlineName>
                        </AirlineContainer>
                        <TimeContainer>
                          <FlightInformation>
                            <Time>
                              {flight.Flight?.DepartureDate.split(" ")[1]}
                            </Time>
                            <Location>
                              {flight.Flight?.OriginAirport?.AirportCode}
                            </Location>
                          </FlightInformation>
                          <MiddleContainer>
                            <Duration>
                              {calculateDuration(
                                flight.Flight?.DepartureDate ?? "",
                                flight.Flight?.ArrivalDate ?? ""
                              )}
                            </Duration>
                            <LineContainer>
                              <Circle />
                              <Line />
                              <Circle />
                            </LineContainer>
                            <TransitCount>
                              {flight.Flight?.AirportTransits?.length === 0 ? (
                                <>Direct</>
                              ) : (
                                flight.Flight?.AirportTransits?.length +
                                " transit"
                              )}
                            </TransitCount>
                          </MiddleContainer>
                          <FlightInformation>
                            <Time>
                              {flight.Flight?.ArrivalDate.split(" ")[1]}
                            </Time>
                            <Location>
                              {flight.Flight?.DestinationAirport?.AirportCode}
                            </Location>
                          </FlightInformation>
                        </TimeContainer>
                        <SeatContainer>
                          <SeatTitle>Seat Number</SeatTitle>
                          {flight.Seats?.map((seat) => (
                            <Seat>
                              {seat.SeatClass} - {seat.SeatNumber}
                            </Seat>
                          ))}
                        </SeatContainer>
                        <PriceContainer>
                          <Price>
                            {flight.Flight && flight.Seats
                              ? formatCurrency(
                                  calculateFlightPrice(
                                    flight.Flight,
                                    flight.Seats
                                  )
                                )
                              : "Price not available"}
                          </Price>
                        </PriceContainer>
                      </UpperContainer>
                    </FlightCard>
                  ))}
                </FlightContainer>
              )}
              {isHotel && (
                <HotelContainer>
                  {filteredHotelBookings?.map((hotel, index) => (
                    <HotelCard key={index}>
                      <RoomInfoContainer>
                        <RoomImage
                          src={hotel?.Room?.RoomPictures?.[0]?.URL || ""}
                          alt=""
                        />
                        <RoomInformation>
                          <HotelName>
                            {hotel?.Room?.Hotel?.HotelName} -{" "}
                            {hotel.Room?.RoomType?.RoomTypeName}
                          </HotelName>
                          <HotelStarContainer>
                            {Array.from({
                              length: parseInt(
                                hotel.Room?.Hotel?.HotelStar ?? ""
                              ),
                            }).map((_, index) => (
                              <HotelStar key={index} src={StarIcon} />
                            ))}
                          </HotelStarContainer>
                          <DayContainer>
                            {calculateTotalDays(
                              hotel.CheckInDate,
                              hotel.CheckOutDate
                            )}{" "}
                            days
                          </DayContainer>
                          <CheckContainer>
                            <InputForm
                              label="Check In Date"
                              type="date"
                              value={hotel.CheckInDate}
                              onChange={() => {}}
                              disabled
                            />
                            <InputForm
                              label="Check Out Date"
                              type="date"
                              value={hotel.CheckOutDate}
                              onChange={() => {}}
                              disabled
                            />
                            <RightContainer>
                              <Price>
                                {formatCurrency(
                                  parseInt(hotel.Room?.RoomPrice ?? "") *
                                    calculateTotalDays(
                                      hotel.CheckInDate,
                                      hotel.CheckOutDate
                                    )
                                )}
                              </Price>
                            </RightContainer>
                          </CheckContainer>
                          <ReviewButton
                            disabled={hotel.IsReviewed}
                            onClick={() => toggleDropdown(index)}
                          >
                            Give Review
                          </ReviewButton>
                        </RoomInformation>
                      </RoomInfoContainer>
                      {isDropdownVisible(index) && (
                        <DropDownContainer>
                          <FormContainer>
                            <InputForm
                              label="Hotel Review"
                              type="text"
                              value={review}
                              onChange={(value) => setReview(value)}
                            />
                            <InputForm
                              label="Cleanliness Rating"
                              type="number"
                              value={clean}
                              onChange={(value) => setClean(value)}
                            />
                            <InputForm
                              label="Comfort Rating"
                              type="number"
                              value={comfort}
                              onChange={(value) => setComfort(value)}
                            />
                            <InputForm
                              label="Location Rating"
                              type="number"
                              value={location}
                              onChange={(value) => setLocation(value)}
                            />
                            <InputForm
                              label="Service Rating"
                              type="number"
                              value={service}
                              onChange={(value) => setService(value)}
                            />
                            <ErrorMessage>{error}</ErrorMessage>
                            <Wrapper>
                              <CheckboxInputForm
                                label="Sent as anonymous?"
                                checked={isAnonymous}
                                onChange={(value) => setAnonymous(value)}
                              />
                              <ReviewButton
                                onClick={() =>
                                  handleSubmit(
                                    hotel.Room?.Hotel?.ID ?? 0,
                                    hotel.ID ?? 0
                                  )
                                }
                              >
                                Submit
                              </ReviewButton>
                            </Wrapper>
                          </FormContainer>
                        </DropDownContainer>
                      )}
                    </HotelCard>
                  ))}
                </HotelContainer>
              )}
            </>
          ) : (
            <NoMessage>You don't have any history.</NoMessage>
          )}
        </HistoryContainer>
      </InnerContainer>
      <Footer />
    </Container>
  );
};

export default ViewHistoryPage;
