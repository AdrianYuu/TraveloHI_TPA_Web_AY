import styled from "@emotion/styled";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Carousel from "../components/carousel";
import InformationOne from "../assets/Information_1.png";
import InformationTwo from "../assets/Information_2.png";
import InformationThree from "../assets/Information_3.png";
import { useEffect, useState } from "react";
import { IFlight } from "../interfaces/flight-interface";
import { getFlightTop5 } from "../api/api-flight";
import TopFlightCard from "../components/top-flight-card";
import { IHotel } from "../interfaces/hotel-interface";
import { getHotelTop5 } from "../api/api-hotel";
import TopHotelCard from "../components/top-hotel-card";

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

const WhyTravel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding-bottom: 4rem;
`;

const Title = styled.p`
  color: white;
  font-size: 2rem;
  font-weight: 800;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  padding-right: 1rem;
  max-width: 25rem;
`;

const Image = styled.img`
  width: 16rem;
  height: 12rem;
  border-radius: 0.5rem 0 0 0.5rem;
`;

const Information = styled.div`
  font-size: 1rem;
  line-height: 1.3;
`;

const FlightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

const FlightCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const HotelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

const HotelCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const IndexPage = () => {
  const [topFlight, setTopFlight] = useState<IFlight[] | null>(null);
  const [topHotel, setTopHotel] = useState<IHotel[] | null>(null);

  const fetchData = async () => {
    setTopFlight(await getFlightTop5());
    setTopHotel(await getHotelTop5());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <ItemContainer>
          <Carousel />
          <FlightWrapper>
            <Title>Top 5 Flights</Title>
            <FlightCardContainer>
              {topFlight && topFlight.length > 0 ? (
                topFlight.map((flight) => (
                  <TopFlightCard key={flight.ID} flight={flight} />
                ))
              ) : (
                <p style={{ color: "white" }}>
                  There are no ongoing flights at the moment.
                </p>
              )}
            </FlightCardContainer>
          </FlightWrapper>
          <HotelWrapper>
            <Title>Top 5 Hotels</Title>
            <HotelCardContainer>
              {topHotel && topHotel.length > 0 ? (
                topHotel.map((hotel) => (
                  <TopHotelCard key={hotel.ID} hotel={hotel} />
                ))
              ) : (
                <p style={{ color: "white" }}>
                  There are no hotels at the moment.
                </p>
              )}
            </HotelCardContainer>
          </HotelWrapper>
          <WhyTravel>
            <Title>Why Travel with TraveloHI?</Title>
            <CardContainer>
              <Card>
                <Image src={InformationOne} />
                <Information>
                  Many exciting and exclusive flash sales are waiting for you to
                  discover and enjoy!
                </Information>
              </Card>
              <Card>
                <Image src={InformationTwo} />
                <Information>
                  "Unlock incredible cashback rewards, up to a whopping
                  1,000,000!
                </Information>
              </Card>
              <Card>
                <Image src={InformationThree} />
                <Information>
                  Earn substantial cashback on every purchase and unlock a
                  multitude of savings waiting just for you!
                </Information>
              </Card>
            </CardContainer>
          </WhyTravel>
        </ItemContainer>
      </InnerContainer>
      <Footer />
    </Container>
  );
};

export default IndexPage;
