import styled from "@emotion/styled";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useEffect, useState } from "react";
import { IFlightTicket } from "../../../interfaces/flight-ticket-interface";
import useUser from "../../../contexts/user-context";
import { getFlightTicketsPaid } from "../../../api/api-flight-ticket";
import { IHotelBooking } from "../../../interfaces/hotel-booking-interface";
import { getHotelBookingsPaid } from "../../../api/api-hotel-booking";
import useLanguage from "../../../contexts/language-context";
import { calculateDuration, calculateTotalDays } from "../../../utils/util";
import { IFlight } from "../../../interfaces/flight-interface";
import { ISeat } from "../../../interfaces/seat-interface";
import InputForm from "./../../../components/input-form";
import StarIcon from "../../../assets/Star_Icon.png";
import CheckboxInputForm from "./../../../components/checkbox-input-form";

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

const OrderContainer = styled.div`
  display: flex;
  min-width: 80rem;
  flex-direction: column;
  gap: 2rem;
`;

const OrderTitle = styled.p`
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
  max-height: 50rem;
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

const ViewOrderPage = () => {
  const { user } = useUser();
  const { formatCurrency } = useLanguage();

  const [flightTicket, setFlightTicket] = useState<IFlightTicket[] | null>(
    null
  );

  const [hotelBooking, setHotelBooking] = useState<IHotelBooking[] | null>(
    null
  );

  const [isHotel, setIsHotel] = useState<boolean>(true);
  const [isFlight, setIsFlight] = useState<boolean>(true);

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
      setFlightTicket(
        validFlightTickets.filter(
          (flight) =>
            new Date(flight?.Flight?.DepartureDate ?? "") >= new Date()
        )
      );
    }
  };

  const fetchBooking = async () => {
    const validHotelBookings = await getHotelBookingsPaid(user?.ID ?? -1);
    if (validHotelBookings) {
      setHotelBooking(
        validHotelBookings.filter(
          (hotel) => new Date(hotel?.CheckInDate ?? "") >= new Date()
        )
      );
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
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

  return (
    <Container>
      <Navbar onSearch={handleSearch} />
      <InnerContainer>
        <OrderContainer>
          <OrderTitle>My Ticket and Hotel Order</OrderTitle>
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
                        </RoomInformation>
                      </RoomInfoContainer>
                    </HotelCard>
                  ))}
                </HotelContainer>
              )}
            </>
          ) : (
            <NoMessage>You don't have any order.</NoMessage>
          )}
        </OrderContainer>
      </InnerContainer>
      <Footer />
    </Container>
  );
};

export default ViewOrderPage;
