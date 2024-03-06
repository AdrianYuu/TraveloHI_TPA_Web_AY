import styled from "@emotion/styled";
import { IFlight } from "./../interfaces/flight-interface.d";
import { calculateDuration } from "../utils/util";

interface TopFlightCardProps {
  flight: IFlight;
}

const Container = styled.div`
  background-color: white;
  width: 28rem;
  display: flex;
  border-radius: 1rem;
`;

const AirlineImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem 0 0 1rem;
`;

const FlightContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

const Code = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
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

const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const Duration = styled.p``;

const TransitCount = styled.p``;

const TopFlightCard: React.FC<TopFlightCardProps> = ({ flight }) => {
  return (
    <Container>
      <AirlineImage src={flight.Airplane?.Airline?.AirlinePictureURL} />
      <FlightContainer>
        <Code>{flight.FlightCode}</Code>
        <TimeContainer>
          <FlightInformation>
            <Time>{flight.DepartureDate.split(" ")[1]}</Time>
            <Location>{flight.OriginAirport?.AirportCode}</Location>
          </FlightInformation>
          <MiddleContainer>
            <Duration>
              {calculateDuration(flight.DepartureDate, flight.ArrivalDate)}
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
            <Location>{flight.DestinationAirport?.AirportCode}</Location>
          </FlightInformation>
        </TimeContainer>
      </FlightContainer>
    </Container>
  );
};

export default TopFlightCard;
