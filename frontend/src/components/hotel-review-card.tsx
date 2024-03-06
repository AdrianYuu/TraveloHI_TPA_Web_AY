import styled from "@emotion/styled";
import { IHotelReview } from "../interfaces/hotel-review-interface";

interface HotelReviewCardProps {
  hotelReview: IHotelReview;
}

const Container = styled.div`
  background-color: #0ca8e8;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
`;

const ReviewerName = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
`;

const ReviewText = styled.p`
  font-size: 1rem;
`;

const HotelReviewCard: React.FC<HotelReviewCardProps> = ({ hotelReview }) => {
  return (
    <Container>
      <ReviewerName>
        {hotelReview.Name ? hotelReview.Name : "Anonymous"}
      </ReviewerName>
      <ReviewText>{hotelReview.Review}</ReviewText>
    </Container>
  );
};

export default HotelReviewCard;
