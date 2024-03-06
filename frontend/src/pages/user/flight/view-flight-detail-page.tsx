import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IFlight } from "../../../interfaces/flight-interface";
import useLanguage from "../../../contexts/language-context";
import { getFlight } from "../../../api/api-flight";
import Navbar from "../../../components/navbar";
import { calculateDuration } from "../../../utils/util";
import InputForm from "../../../components/input-form";
import { IFlightTicket } from "../../../interfaces/flight-ticket-interface";
import CheckboxInputForm from "../../../components/checkbox-input-form";
import { createFlightTicket } from "../../../api/api-flight-ticket";
import { HttpStatusCode } from "axios";
import { ISeat } from "../../../interfaces/seat-interface";
import { createSeat } from "../../../api/api-seat";
import useUser from "../../../contexts/user-context";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f7f9fa;
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 2rem;
`;

const FlightInformationContainer = styled.div`
  background-color: white;
  display: flex;
  border-radius: 1rem;
  min-width: 80rem;
  gap: 2rem;
`;

const AirlineImage = styled.img`
  width: 18rem;
  border-radius: 1rem 0 0 1rem;
`;

const RightInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const AirlineName = styled.p`
  font-weight: 800;
  font-size: 4rem;
`;

const AirplaneName = styled.p`
  font-size: 1.5rem;
`;

const PlaceContainer = styled.div`
  display: flex;
  gap: 2rem;
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  flex-direction: column;
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

const Time = styled.p`
  color: black;
  font-weight: 600;
  font-size: 1rem;
`;

const LineContainerV = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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

const FlightDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Date = styled.p``;

const TimeContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const FlightInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

const Location = styled.p`
  color: #687279;
  font-weight: 400;
  font-size: 0.8rem;
`;

const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const Duration = styled.p``;

const LineContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TransitCount = styled.p``;

const Line = styled.div`
  width: 4rem;
  height: 0.1rem;
  background-color: black;
`;

const InnerDetailContainer = styled.div`
  display: flex;
  gap: 4rem;
`;

const FlightDetailTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SeatContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SeatTitle = styled.p`
  font-weight: 600;
  font-size: 2rem;
`;

const SeatChairContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 4rem;
`;

const Seat = styled.div<{ selected: boolean; occupied: boolean }>`
  width: 3rem;
  height: 3rem;
  background-color: ${({ selected, occupied }) => {
    if (occupied) return "grey";
    return selected ? "#2074f4" : "white";
  }};
  border-radius: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: ${({ occupied }) => (occupied ? "not-allowed" : "pointer")};
  color: ${({ selected }) => (selected ? "white" : "black")};

  &:hover {
    background-color: ${({ selected, occupied }) => {
      if (occupied) return "grey";
      return selected ? "#086cdc" : "#2074f4";
    }};
    color: ${({ occupied }) => (occupied ? "black" : "white")};
  }
`;

const SeatDummy1 = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: white;
  border-radius: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  color: white;
`;

const SeatDummy2 = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: grey;
  border-radius: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  color: grey;
`;

const SeatDummy3 = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #2074f4;
  border-radius: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  color: #2074f4;
`;

const SeatRow = styled.div`
  display: flex;
  gap: 4rem;
`;

const SeatLeft = styled.div`
  display: flex;
  gap: 1rem;
`;

const SeatRight = styled.div`
  display: flex;
  gap: 1rem;
`;

const EconomyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BusinessContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChairContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  background-color: #ff5c1c;
  padding: 2rem;
  border-radius: 2rem;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const LegendTitle = styled.p`
  font-weight: 600;
  font-size: 1.7rem;
`;

const SeatInformation = styled.div`
  background-color: #f0ecec;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  width: 25%;
`;

const SeatDummyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SeatDummyLabel = styled.p`
  font-weight: 600;
`;

const PriceTitle = styled.p`
  font-size: 1.7rem;
  font-weight: 600;
`;

const PriceInformation = styled.div`
  background-color: #f0ecec;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  width: 35%;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ClassTitle = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
`;

const TotalPrice = styled.p`
  font-size: 1.5rem;
`;

const ChooseButton = styled.button`
  border-radius: 0.5rem;
  font-weight: 600;
  background-color: #ff5c1c;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  padding: 0.8rem;
  width: 8rem;

  &:hover {
    background-color: #e0440c;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
  font-size: 1rem;
  min-height: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ViewFlightDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { formatCurrency } = useLanguage();
  const { user } = useUser();

  const [flight, setFlight] = useState<IFlight | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [quantity, setQuantity] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [occupiedSeats, setOccupiedSeats] = useState<number[]>([]);

  const fetchFlight = async () => {
    try {
      const FlightID = id ? parseInt(id, 10) : undefined;
      if (FlightID) {
        setFlight(await getFlight(FlightID));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFlight();
  }, [id]);

  useEffect(() => {
    const extractOccupiedSeats = () => {
      if (flight?.FlightTickets) {
        const occupiedSeatsList: number[] = [];
        flight.FlightTickets.forEach((ticket) => {
          ticket.Seats?.forEach((seat) => {
            if (seat.SeatNumber) {
              occupiedSeatsList.push(parseInt(seat.SeatNumber));
            }
          });
        });
        setOccupiedSeats(occupiedSeatsList);
      }
    };

    extractOccupiedSeats();
  }, [flight]);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedSeats, flight]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    const basePrice = parseInt(flight?.FlightPrice ?? "0");

    selectedSeats.forEach((seatNumber) => {
      if (seatNumber <= 18) {
        totalPrice += basePrice * 1.5;
      } else {
        totalPrice += basePrice;
      }
    });

    setTotalPrice(totalPrice);
  };

  const toggleSeatSelection = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length < parseInt(quantity)) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const handleSubmit = async () => {
    setError("");

    const FlightTicket: IFlightTicket = {
      UserID: user?.ID,
      FlightID: flight?.ID,
      SelectedSeat: selectedSeats.length,
      IsLuggage: checked,
      Status: "Unpaid",
    };

    const response = await createFlightTicket(FlightTicket);
    if (response?.StatusCode === HttpStatusCode.Ok) {
      const FlightTicketID = response.Message;

      const createSeatPromises = selectedSeats.map(async (seat) => {
        let seatClass = "";
        if (seat >= 1 && seat <= 18) {
          seatClass = "Business";
        } else {
          seatClass = "Economy";
        }

        const Seat: ISeat = {
          FlightTicketID: parseInt(FlightTicketID),
          SeatNumber: seat.toString(),
          SeatClass: seatClass,
        };

        createSeat(Seat);
      });

      await Promise.all(createSeatPromises);
      navigate("/view-cart");
    } else {
      setError(response?.Message ?? "Error");
    }
  };

  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <FlightDetailContainer>
          <FlightInformationContainer>
            <AirlineImage src={flight?.Airplane?.Airline?.AirlinePictureURL} />
            <RightInformation>
              <AirlineName>
                {flight?.Airplane?.Airline?.AirlineName}
              </AirlineName>
              <AirplaneName>
                {flight?.Airplane?.AirplaneName} - {flight?.FlightCode}
              </AirplaneName>
              <TimeContainer>
                <FlightInformation>
                  <Time>{flight?.DepartureDate.split(" ")[1]}</Time>
                  <Location>{flight?.OriginAirport?.AirportCode}</Location>
                </FlightInformation>
                <MiddleContainer>
                  <Duration>
                    {flight?.DepartureDate &&
                      flight?.ArrivalDate &&
                      calculateDuration(
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
                    {flight?.AirportTransits?.length === 0 ? (
                      <>Direct</>
                    ) : (
                      flight?.AirportTransits?.length + " transit"
                    )}
                  </TransitCount>
                </MiddleContainer>
                <FlightInformation>
                  <Time>{flight?.ArrivalDate.split(" ")[1]}</Time>
                  <Location>{flight?.DestinationAirport?.AirportCode}</Location>
                </FlightInformation>
              </TimeContainer>
            </RightInformation>
          </FlightInformationContainer>
          <PlaceContainer>
            <FlightDetailTitle>Flight Detail</FlightDetailTitle>
            <InnerDetailContainer>
              <LeftDropdownContainer>
                <BottomTimeContainer>
                  <Time>{flight?.DepartureDate.split(" ")[1]}</Time>
                  <Date>{flight?.DepartureDate.split(" ")[0]}</Date>
                </BottomTimeContainer>
                <LineContainerV>
                  <Circle />
                  <LineV />
                  <Circle />
                </LineContainerV>
                <BottomTimeContainer>
                  <Time>{flight?.ArrivalDate.split(" ")[1]}</Time>
                  <Date>{flight?.ArrivalDate.split(" ")[0]}</Date>
                </BottomTimeContainer>
              </LeftDropdownContainer>
              <RightDropdownContainer>
                <CityInformation>
                  <CityName>{flight?.OriginAirport?.City.CityName}</CityName>
                  <AirportName>
                    {flight?.OriginAirport?.AirportName}
                  </AirportName>
                </CityInformation>
                {flight?.AirportTransits?.map((transit) => (
                  <CityInformation key={transit.ID}>
                    <CityName>{transit.Airport?.City.CityName}</CityName>
                    <AirportName>{transit.Airport?.AirportName}</AirportName>
                  </CityInformation>
                ))}
                <CityInformation>
                  <CityName>
                    {flight?.DestinationAirport?.City.CityName}
                  </CityName>
                  <AirportName>
                    {flight?.DestinationAirport?.AirportName}
                  </AirportName>
                </CityInformation>
              </RightDropdownContainer>
            </InnerDetailContainer>
          </PlaceContainer>
          <SeatContainer>
            <SeatTitle>Choose your seat</SeatTitle>
            <SeatChairContainer>
              <ChairContainer>
                <BusinessContainer>
                  {[...Array(3)].map((_, index) => (
                    <SeatRow key={index}>
                      <SeatLeft>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 1)}
                          occupied={occupiedSeats.includes(index * 6 + 1)}
                          onClick={() => toggleSeatSelection(index * 6 + 1)}
                        >
                          {index * 6 + 1}
                        </Seat>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 2)}
                          occupied={occupiedSeats.includes(index * 6 + 2)}
                          onClick={() => toggleSeatSelection(index * 6 + 2)}
                        >
                          {index * 6 + 2}
                        </Seat>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 3)}
                          occupied={occupiedSeats.includes(index * 6 + 3)}
                          onClick={() => toggleSeatSelection(index * 6 + 3)}
                        >
                          {index * 6 + 3}
                        </Seat>
                      </SeatLeft>
                      <SeatRight>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 4)}
                          occupied={occupiedSeats.includes(index * 6 + 4)}
                          onClick={() => toggleSeatSelection(index * 6 + 4)}
                        >
                          {index * 6 + 4}
                        </Seat>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 5)}
                          occupied={occupiedSeats.includes(index * 6 + 5)}
                          onClick={() => toggleSeatSelection(index * 6 + 5)}
                        >
                          {index * 6 + 5}
                        </Seat>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 6)}
                          occupied={occupiedSeats.includes(index * 6 + 6)}
                          onClick={() => toggleSeatSelection(index * 6 + 6)}
                        >
                          {index * 6 + 6}
                        </Seat>
                      </SeatRight>
                    </SeatRow>
                  ))}
                </BusinessContainer>
                <EconomyContainer>
                  {[...Array(10)].map((_, index) => (
                    <SeatRow key={index}>
                      <SeatLeft>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 1 + 18)}
                          occupied={occupiedSeats.includes(index * 6 + 1 + 18)}
                          onClick={() =>
                            toggleSeatSelection(index * 6 + 1 + 18)
                          }
                        >
                          {index * 6 + 1 + 18}
                        </Seat>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 2 + 18)}
                          occupied={occupiedSeats.includes(index * 6 + 2 + 18)}
                          onClick={() =>
                            toggleSeatSelection(index * 6 + 2 + 18)
                          }
                        >
                          {index * 6 + 2 + 18}
                        </Seat>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 3 + 18)}
                          occupied={occupiedSeats.includes(index * 6 + 3 + 18)}
                          onClick={() =>
                            toggleSeatSelection(index * 6 + 3 + 18)
                          }
                        >
                          {index * 6 + 3 + 18}
                        </Seat>
                      </SeatLeft>
                      <SeatRight>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 4 + 18)}
                          occupied={occupiedSeats.includes(index * 6 + 4 + 18)}
                          onClick={() =>
                            toggleSeatSelection(index * 6 + 4 + 18)
                          }
                        >
                          {index * 6 + 4 + 18}
                        </Seat>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 5 + 18)}
                          occupied={occupiedSeats.includes(index * 6 + 5 + 18)}
                          onClick={() =>
                            toggleSeatSelection(index * 6 + 5 + 18)
                          }
                        >
                          {index * 6 + 5 + 18}
                        </Seat>
                        <Seat
                          selected={selectedSeats.includes(index * 6 + 6 + 18)}
                          occupied={occupiedSeats.includes(index * 6 + 6 + 18)}
                          onClick={() =>
                            toggleSeatSelection(index * 6 + 6 + 18)
                          }
                        >
                          {index * 6 + 6 + 18}
                        </Seat>
                      </SeatRight>
                    </SeatRow>
                  ))}
                </EconomyContainer>
              </ChairContainer>
              <InformationContainer>
                <InputForm
                  label="How many seat?"
                  type="number"
                  value={quantity}
                  onChange={(value) => {
                    setQuantity(value);
                  }}
                />
                <>
                  <LegendTitle>Legends</LegendTitle>
                  <SeatInformation>
                    <SeatDummyContainer>
                      <SeatDummy1>.</SeatDummy1>
                      <SeatDummyLabel>Available</SeatDummyLabel>
                    </SeatDummyContainer>
                    <SeatDummyContainer>
                      <SeatDummy2>.</SeatDummy2>
                      <SeatDummyLabel>Not Available</SeatDummyLabel>
                    </SeatDummyContainer>
                    <SeatDummyContainer>
                      <SeatDummy3>.</SeatDummy3>
                      <SeatDummyLabel>Selected</SeatDummyLabel>
                    </SeatDummyContainer>
                  </SeatInformation>
                </>
                <>
                  <PriceTitle>Price</PriceTitle>
                  <PriceInformation>
                    <PriceContainer>
                      <ClassTitle>Business [Seat 1 - 18]</ClassTitle>
                      <>
                        {formatCurrency(
                          parseInt(flight?.FlightPrice ?? "") * 1.5
                        )}{" "}
                      </>
                    </PriceContainer>
                    <PriceContainer>
                      <ClassTitle>Economy [Seat 19 - 78]</ClassTitle>
                      {formatCurrency(parseInt(flight?.FlightPrice ?? ""))}{" "}
                    </PriceContainer>
                  </PriceInformation>
                </>
                <>
                  <LegendTitle>Total Price</LegendTitle>
                  <TotalPrice>{formatCurrency(totalPrice)}</TotalPrice>
                </>
                <CheckboxInputForm
                  label="I want to use luggage."
                  checked={checked}
                  onChange={(value) => setChecked(value)}
                />
                <ErrorMessage>{error}</ErrorMessage>
                <ButtonContainer>
                  <ChooseButton onClick={handleSubmit}>
                    Add To Cart
                  </ChooseButton>
                </ButtonContainer>
              </InformationContainer>
            </SeatChairContainer>
          </SeatContainer>
        </FlightDetailContainer>
      </InnerContainer>
    </Container>
  );
};

export default ViewFlightDetailPage;
