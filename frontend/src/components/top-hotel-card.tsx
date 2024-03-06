import styled from "@emotion/styled";
import { IHotel } from "../interfaces/hotel-interface";
import StarIcon from "../assets/Star_Icon.png";

interface TopHotelCardProps {
  hotel: IHotel;
}

const Container = styled.div`
  background-color: white;
  width: 28rem;
  display: flex;
  border-radius: 1rem;
`;

const HotelImage = styled.img`
  width: 13rem;
  height: 13rem;
  border-radius: 1rem 0 0 1rem;
`;

const HotelContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const HotelName = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const HotelStarContainer = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const HotelStar = styled.img`
  width: 1rem;
`;

const HotelAddress = styled.p`
  font-size: 1rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const HotelDescription = styled.p`
  font-size: 0.8rem;
  width: 100%;
`;

const TopHotelCard: React.FC<TopHotelCardProps> = ({ hotel }) => {
  return (
    <Container>
      <HotelImage src={hotel?.HotelPictures?.[0]?.URL || ""} />
      <HotelContainer>
        <HotelName>{hotel.HotelName}</HotelName>
        <HotelStarContainer>
          {Array.from({ length: parseInt(hotel.HotelStar) }).map((_, index) => (
            <HotelStar key={index} src={StarIcon} />
          ))}
        </HotelStarContainer>
        <HotelAddress>{hotel.HotelAddress}</HotelAddress>
        <HotelDescription>{hotel.HotelDescription}</HotelDescription>
      </HotelContainer>
    </Container>
  );
};

export default TopHotelCard;
