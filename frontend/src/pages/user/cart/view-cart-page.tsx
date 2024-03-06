import styled from "@emotion/styled";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useEffect, useState } from "react";
import { IFlightTicket } from "../../../interfaces/flight-ticket-interface";
import useUser from "../../../contexts/user-context";
import {
  getFlightTicketsUnpaid,
  updateFlightTicketStatus,
} from "../../../api/api-flight-ticket";
import { IHotelBooking } from "../../../interfaces/hotel-booking-interface";
import {
  getHotelBookingsUnpaid,
  updateHotelBooking,
  updateHotelBookingStatus,
} from "../../../api/api-hotel-booking";
import useLanguage from "../../../contexts/language-context";
import { calculateDuration, calculateTotalDays } from "../../../utils/util";
import { IFlight } from "../../../interfaces/flight-interface";
import { ISeat } from "../../../interfaces/seat-interface";
import InputForm from "./../../../components/input-form";
import StarIcon from "../../../assets/Star_Icon.png";
import { HttpStatusCode } from "axios";
import SelectInputForm from "./../../../components/select-input-form";
import {
  getCreditCards,
  payUsingCreditCard,
} from "../../../api/api-credit-card";
import { payUsingWallet } from "../../../api/api-wallet";
import { sendPaymentEmailToUser } from "../../../api/api-payment";
import {
  checkUserPromo,
  getPromoByPromoCode,
  usePromo,
} from "../../../api/api-promo";
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

const CartContainer = styled.div`
  display: flex;
  min-width: 80rem;
  flex-direction: column;
`;

const CartTitle = styled.p`
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const FlightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const HotelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
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

const UpdateButton = styled.button`
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

const DayContainer = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
  font-size: 1rem;
  min-height: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 2rem;
`;

const Status = styled.div`
  font-size: 1.2rem;
`;

const Valid = styled.p`
  color: green;
  font-weight: 600;
`;

const Expired = styled.p`
  color: red;
  font-weight: 600;
`;

const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TotalPriceTitle = styled.p`
  font-weight: 600;
  font-size: 2rem;
`;

const TotalPriceReal = styled.p`
  font-size: 2rem;
`;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PayButton = styled.button`
  margin-top: 1.5rem;
  width: 6%;
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

const NoMessage = styled.p`
  color: #555;
`;

const WalletContainer = styled.div``;

const CreditCardContainer = styled.div``;

const PromoContainer = styled.div``;

const ViewCartPage = () => {
  const { user } = useUser();
  const { formatCurrency } = useLanguage();

  const [flightTicket, setFlightTicket] = useState<IFlightTicket[] | null>(
    null
  );

  const [hotelBooking, setHotelBooking] = useState<IHotelBooking[] | null>(
    null
  );

  const [promo, setPromo] = useState<string>("");

  const [checkInDates, setCheckInDates] = useState<string[]>([]);
  const [checkOutDates, setCheckOutDates] = useState<string[]>([]);
  let [totalPrice, setTotalPrice] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<string>("");

  const paymentOptions = ["HI-Wallet", "Credit Card"];

  const [selectedCreditCard, setSelectedCreditCard] = useState<string>("");
  const [creditCards, setCreditCards] = useState<string[]>([]);

  const [promoApplied, setPromoApplied] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchTicket();
    fetchBooking();
    fetchCreditCard();
  }, [user]);

  useEffect(() => {
    if (hotelBooking) {
      const initialCheckInDates = hotelBooking.map((book) => book.CheckInDate);
      const initialCheckOutDates = hotelBooking.map(
        (book) => book.CheckOutDate
      );
      setCheckInDates(initialCheckInDates);
      setCheckOutDates(initialCheckOutDates);
    }
  }, [hotelBooking]);

  useEffect(() => {
    if (flightTicket && hotelBooking) {
      let totalPrice = 0;

      flightTicket.forEach((flight) => {
        if (
          flight.Flight &&
          flight.Seats &&
          new Date(flight.Flight.DepartureDate ?? "") > new Date()
        ) {
          totalPrice += calculateFlightPrice(flight.Flight, flight.Seats);
        }
      });

      hotelBooking.forEach((hotel) => {
        if (new Date(hotel.CheckInDate ?? "") > new Date()) {
          totalPrice += calculateHotelPrice(hotel);
        }
      });

      setTotalPrice(totalPrice);
    }
  }, [flightTicket, hotelBooking]);

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

  const handleCheckInChange = (index: number, value: string) => {
    const updatedCheckInDates = [...checkInDates];
    updatedCheckInDates[index] = value;
    setCheckInDates(updatedCheckInDates);
  };

  const handleCheckOutChange = (index: number, value: string) => {
    const updatedCheckOutDates = [...checkOutDates];
    updatedCheckOutDates[index] = value;
    setCheckOutDates(updatedCheckOutDates);
  };

  const handleUpdate = async (HotelBookingID: number, index: number) => {
    setError("");

    const response = await updateHotelBooking(
      HotelBookingID,
      checkInDates[index],
      checkOutDates[index]
    );

    if (response?.StatusCode === HttpStatusCode.Ok) {
      await fetchBooking();
    } else {
      setError(response?.Message ?? "Error.");
    }
  };

  const fetchTicket = async () => {
    setFlightTicket(await getFlightTicketsUnpaid(user?.ID ?? -1));
  };

  const fetchBooking = async () => {
    setHotelBooking(await getHotelBookingsUnpaid(user?.ID ?? -1));
  };

  const fetchCreditCard = async () => {
    const creditCards = await getCreditCards(user?.ID ?? -1);
    if (creditCards) {
      const creditCardNumbers = creditCards.map(
        (card) => card.ID + " - " + card.BankName + " - " + card.CardNumber
      );
      setCreditCards(creditCardNumbers);
    }
  };

  const calculateHotelPrice = (hotel: IHotelBooking) => {
    return (
      parseInt(hotel.Room?.RoomPrice ?? "") *
      calculateTotalDays(hotel.CheckInDate, hotel.CheckOutDate)
    );
  };

  const handleWallet = async () => {
    const response = await payUsingWallet(
      user?.ID ?? -1,
      totalPrice,
      paymentType
    );
    if (response?.StatusCode === HttpStatusCode.Ok) {
      await handlePayment();
    } else {
      setError(response?.Message ?? "Error.");
    }
  };

  const handleCreditCard = async () => {
    const response = await payUsingCreditCard(
      user?.ID ?? -1,
      parseInt(selectedCreditCard),
      paymentType
    );
    if (response?.StatusCode === HttpStatusCode.Ok) {
      await handlePayment();
    } else {
      setError(response?.Message ?? "Error.");
    }
  };

  const handlePayment = async () => {
    if (promoApplied) {
      await usePromo(user?.ID ?? 0, promo);
    }

    const validHotelBookings =
      hotelBooking?.filter(
        (hotel) => new Date(hotel.CheckInDate ?? "") > new Date()
      ) ?? [];

    const payHotelPromises = validHotelBookings.map(async (hotel) => {
      const response = await updateHotelBookingStatus(hotel.ID ?? 0, "Paid");
      if (response?.StatusCode !== HttpStatusCode.Ok) {
        setError(response?.Message ?? "");
        return;
      }
    });

    await Promise.all(payHotelPromises);

    const validFlightTickets =
      flightTicket?.filter(
        (flight) =>
          flight.Flight &&
          new Date(flight.Flight.DepartureDate ?? "") > new Date()
      ) ?? [];

    const payFlightPromises = validFlightTickets.map(async (flight) => {
      const response = await updateFlightTicketStatus(flight.ID ?? 0, "Paid");
      if (response?.StatusCode !== HttpStatusCode.Ok) {
        setError(response?.Message ?? "");
        return;
      }
    });

    await Promise.all(payFlightPromises);

    const response = await sendPaymentEmailToUser(
      user?.Email ?? "",
      `Thank you for your payment! with a total of ${formatCurrency(
        totalPrice
      )}!`
    );

    if (response?.StatusCode === HttpStatusCode.Ok) {
      fetchTicket();
      fetchBooking();
      fetchCreditCard();
      setPromoApplied(false);
      setPromo("");
      setError("");
    }
  };

  const handlePromo = async () => {
    setError("");
    if (!promoApplied) {
      const response = await getPromoByPromoCode(promo);

      if (response == null) {
        setError("Invalid promo code or maybe the promo already expired!");
        return;
      }

      const isUsed = await checkUserPromo(user?.ID ?? 0, promo);

      if (isUsed == null) {
        setError("Promo code already redeemed!");
        return;
      }

      let realPrice = (totalPrice -= parseInt(response.PromoDiscount));
      if (realPrice <= 0) realPrice = 0;
      setTotalPrice(realPrice);
      setPromoApplied(true);
    }
  };

  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <CartContainer>
          <CartTitle>My Cart</CartTitle>
          {(flightTicket && flightTicket.length > 0) ||
          (hotelBooking && hotelBooking.length > 0) ? (
            <>
              <FlightContainer>
                {flightTicket?.map((flight, index) => (
                  <FlightCard key={index}>
                    <Status>
                      {new Date(flight.Flight?.DepartureDate ?? "") >
                      new Date() ? (
                        <Valid>Valid</Valid>
                      ) : (
                        <Expired>Expired</Expired>
                      )}
                    </Status>
                    <UpperContainer>
                      <AirlineContainer>
                        <AirlineLogo
                          src={
                            flight.Flight?.Airplane?.Airline?.AirlinePictureURL
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
                      <CheckboxInputForm
                        label="Luggage"
                        checked={flight.IsLuggage}
                        onChange={() => {}}
                      />
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
              <HotelContainer>
                {hotelBooking?.map((hotel, index) => (
                  <HotelCard key={index}>
                    <Status>
                      {new Date(hotel.CheckInDate ?? "") > new Date() ? (
                        <Valid>Valid</Valid>
                      ) : (
                        <Expired>Expired</Expired>
                      )}
                    </Status>
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
                            value={checkInDates[index]}
                            onChange={(value) =>
                              handleCheckInChange(index, value)
                            }
                          />
                          <InputForm
                            label="Check Out Date"
                            type="date"
                            value={checkOutDates[index]}
                            onChange={(value) =>
                              handleCheckOutChange(index, value)
                            }
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
                        <UpdateButton
                          onClick={() => handleUpdate(hotel?.ID ?? -1, index)}
                          disabled={
                            new Date(hotel.CheckInDate ?? "") <= new Date()
                          }
                        >
                          Update
                        </UpdateButton>
                      </RoomInformation>
                    </RoomInfoContainer>
                  </HotelCard>
                ))}
              </HotelContainer>
              <TotalPrice>
                <TotalPriceTitle>Total Price</TotalPriceTitle>
                <TotalPriceReal>{formatCurrency(totalPrice)}</TotalPriceReal>
              </TotalPrice>
              {totalPrice >= 0 && (
                <PaymentContainer>
                  <SelectInputForm
                    label="Payment Type"
                    options={paymentOptions}
                    value={paymentType}
                    onChange={(value) => setPaymentType(value)}
                  />
                  {user && paymentType == "HI-Wallet" && (
                    <>
                      <PromoContainer>
                        <InputForm
                          label="Promo Code"
                          type="text"
                          value={promo}
                          onChange={(value) => setPromo(value)}
                          disabled={promoApplied}
                        />
                        <PayButton onClick={handlePromo}>Use</PayButton>
                      </PromoContainer>
                      <WalletContainer>
                        <InputForm
                          label="HI-Wallet Balance"
                          type="text"
                          value={formatCurrency(user?.WalletBalance ?? 0)}
                          onChange={() => {}}
                          disabled
                        />
                        <PayButton onClick={handleWallet}>Pay</PayButton>
                      </WalletContainer>
                    </>
                  )}
                  {user && paymentType == "Credit Card" && (
                    <>
                      <PromoContainer>
                        <InputForm
                          label="Promo Code"
                          type="text"
                          value={promo}
                          onChange={(value) => setPromo(value)}
                          disabled={promoApplied}
                        />
                        <PayButton onClick={handlePromo}>Use</PayButton>
                      </PromoContainer>
                      <CreditCardContainer>
                        <SelectInputForm
                          label="Choose your credit card number!"
                          options={creditCards}
                          value={selectedCreditCard}
                          onChange={(value) =>
                            setSelectedCreditCard(value.split(" - ")[0])
                          }
                        />
                        <PayButton onClick={handleCreditCard}>Pay</PayButton>
                      </CreditCardContainer>
                    </>
                  )}
                </PaymentContainer>
              )}
              <ErrorMessage>{error}</ErrorMessage>
            </>
          ) : (
            <NoMessage>Your cart is empty.</NoMessage>
          )}
        </CartContainer>
      </InnerContainer>
      <Footer />
    </Container>
  );
};

export default ViewCartPage;
