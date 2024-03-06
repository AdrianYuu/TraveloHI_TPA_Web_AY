import styled from "@emotion/styled";
import Navbar from "../../../components/navbar";
import { useEffect, useState } from "react";
import { IHotel } from "../../../interfaces/hotel-interface";
import { getHotel } from "../../../api/api-hotel";
import { useNavigate, useParams } from "react-router-dom";
import LocationIcon from "../../../assets/Location_Icon.png";
import NoImageIcon from "../../../assets/No_Image_Icon.jpg";
import useLanguage from "../../../contexts/language-context";
import StarIcon from "../../../assets/Star_Icon.png";
import InputForm from "./../../../components/input-form";
import { IHotelBooking } from "../../../interfaces/hotel-booking-interface";
import { createHotelBooking } from "../../../api/api-hotel-booking";
import { HttpStatusCode } from "axios";
import useUser from "../../../contexts/user-context";
import HotelReviewCard from "../../../components/hotel-review-card";
import { IHotelReview } from "../../../interfaces/hotel-review-interface";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f7f9fa;
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
`;

const HotelContainer = styled.div`
  padding: 6rem;
  min-width: 80rem;
  height: 100%;
`;

const HotelName = styled.p`
  font-weight: 600;
  font-size: 3rem;
`;

const HotelLocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-top: 2rem;
  font-size: 1.2rem;
`;

const Location = styled.img`
  width: 1.5rem;
`;

const HotelInfo = styled.div``;

const ImageContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  height: 100%;
  justify-content: center;
`;

const BigImage = styled.img`
  width: 33.1rem;
  height: 30rem;
  border-radius: 0.8rem;
`;

const SmallImageContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ImageRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SmallImage = styled.img`
  width: 16rem;
  height: 14.5rem;
  border-radius: 0.8rem;
`;

const HotelDescriptionContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  min-height: 10rem;
`;

const HotelDescriptionTitle = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const HotelDescription = styled.p``;

const HotelFacilityContainer = styled.div`
  margin-top: 2rem;
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
`;

const HotelFacilityTitle = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FacilityContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 20rem;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const FacilityName = styled.span`
  background-color: #0ca8e8;
  color: white;
  border-radius: 0.5rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
`;

const NoMessage = styled.p`
  color: #555;
`;

const HotelRoomContainer = styled.div`
  margin-top: 2rem;
  border-radius: 1rem;
  display: flex;
`;

const RoomPictureContainer = styled.div``;

const BigRoomPicture = styled.img`
  width: 22rem;
  height: 14rem;
  margin-bottom: 0.5rem;
`;

const SmallRoomPictureContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SmallRoomPicture = styled.img`
  width: 7rem;
  min-height: 6rem;
`;

const Card = styled.div``;

const HotelInfoContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background-color: white;
  border-radius: 0 1rem 1rem 0;
`;

const RoomFacilityContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  border-radius: 1rem;
`;

const RoomType = styled.p`
  font-weight: 800;
  font-size: 2rem;
`;

const RoomPrice = styled.p`
  color: #ff5c1c;
  font-weight: 600;
  font-size: 1.2rem;
`;

const ChooseButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  border-radius: 0.5rem;
  font-weight: 600;
  background-color: ${({ isSelected }) => (isSelected ? "#555" : "#ff5c1c")};
  color: white;
  cursor: ${({ isSelected }) => (isSelected ? "default" : "pointer")};
  transition: background-color 0.3s, color 0.3s;
  padding: 0.8rem;
  width: 8rem;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? "#555" : "#e0440c")};
  }
`;

const HotelStarContainer = styled.div`
  margin-top: 0.5rem;
`;

const HotelStar = styled.img`
  width: 1.4rem;
`;

const RoomPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 100%;
  justify-content: end;
  gap: 1rem;
`;

const MiddleContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;
  gap: 2rem;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const RightContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 70%;
`;

const CheckContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
`;

const CheckTitle = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
`;

const InOutContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: 600;
  font-size: 1rem;
  min-height: 1rem;
`;

const AddButton = styled.button`
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

const HotelReviewContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const RatingCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #0ca8e8;
  color: white;
  padding: 1rem;
  border-radius: 1rem;
`;

const RatingCategory = styled.p`
  font-size: 1.2rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Rating = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const ViewHotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [hotel, setHotel] = useState<IHotel | null>(null);
  const { formatCurrency } = useLanguage();
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(0);

  const fetchHotel = async () => {
    try {
      const HotelID = id ? parseInt(id, 10) : undefined;
      if (HotelID) {
        setHotel(await getHotel(HotelID));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [id]);

  const handleChoose = async (roomID: number) => {
    setSelectedRoomId(roomID);
  };

  const handleSubmit = async () => {
    setError("");

    const HotelBooking: IHotelBooking = {
      UserID: user?.ID,
      RoomID: selectedRoomId ?? 0,
      CheckInDate: checkIn,
      CheckOutDate: checkOut,
      Status: "Unpaid",
      IsReviewed: false,
    };

    const response = await createHotelBooking(HotelBooking);

    if (response?.StatusCode === HttpStatusCode.Ok) {
      navigate("/view-cart");
    } else {
      setError(response?.Message ?? "Error");
    }
  };

  const calculateAverageRating = (
    reviews: IHotelReview[] | undefined,
    ratingType: string
  ): number => {
    let totalRating = 0;
    let numberOfReviews = 0;

    if (reviews && reviews.length > 0) {
      reviews.forEach((review) => {
        const rating = review.HotelRatings?.find(
          (rating) => rating.HotelRatingType?.HotelRatingTypeName === ratingType
        )?.Rating;
        if (typeof rating === "number") {
          totalRating += rating;
          numberOfReviews++;
        }
      });
    }

    return numberOfReviews > 0 ? totalRating / numberOfReviews : 0;
  };

  const cleanlinessAverage: number = calculateAverageRating(
    hotel?.HotelReviews,
    "Cleanliness"
  );
  const comfortAverage: number = calculateAverageRating(
    hotel?.HotelReviews,
    "Comfort"
  );
  const locationAverage: number = calculateAverageRating(
    hotel?.HotelReviews,
    "Location"
  );
  const serviceAverage: number = calculateAverageRating(
    hotel?.HotelReviews,
    "Service"
  );

  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <HotelContainer>
          <HotelInfo>
            <HotelName>{hotel?.HotelName}</HotelName>
            <HotelStarContainer>
              {Array.from({ length: parseInt(hotel?.HotelStar ?? "") }).map(
                (_, index) => (
                  <HotelStar key={index} src={StarIcon} />
                )
              )}
            </HotelStarContainer>
            <HotelLocationContainer>
              <Location src={LocationIcon} />
              {hotel?.HotelAddress}
            </HotelLocationContainer>
          </HotelInfo>
          <ImageContainer>
            <BigImage src={hotel?.HotelPictures?.[0]?.URL} />
            <SmallImageContainer>
              <ImageRow>
                <SmallImage
                  src={hotel?.HotelPictures?.[1]?.URL || NoImageIcon}
                />
                <SmallImage
                  src={hotel?.HotelPictures?.[2]?.URL || NoImageIcon}
                />
              </ImageRow>
              <ImageRow>
                <SmallImage
                  src={hotel?.HotelPictures?.[3]?.URL || NoImageIcon}
                />
                <SmallImage
                  src={hotel?.HotelPictures?.[4]?.URL || NoImageIcon}
                />
              </ImageRow>
              <ImageRow>
                <SmallImage
                  src={hotel?.HotelPictures?.[5]?.URL || NoImageIcon}
                />
                <SmallImage
                  src={hotel?.HotelPictures?.[6]?.URL || NoImageIcon}
                />
              </ImageRow>
            </SmallImageContainer>
          </ImageContainer>
          <MiddleContainer>
            <LeftContainer>
              <HotelDescriptionContainer>
                <HotelDescriptionTitle>Hotel Description</HotelDescriptionTitle>
                <HotelDescription>{hotel?.HotelDescription}</HotelDescription>
              </HotelDescriptionContainer>
              <HotelFacilityContainer>
                <HotelFacilityTitle>Hotel Facility</HotelFacilityTitle>
                {hotel?.HotelFacilities && hotel.HotelFacilities?.length > 0 ? (
                  <FacilityContainer>
                    {hotel.HotelFacilities.map((facility) => (
                      <FacilityName key={facility.ID}>
                        {facility.FacilityName}
                      </FacilityName>
                    ))}
                  </FacilityContainer>
                ) : (
                  <NoMessage>No facility.</NoMessage>
                )}
              </HotelFacilityContainer>
            </LeftContainer>
            <RightContainer>
              <HotelFacilityTitle>Hotel Rating</HotelFacilityTitle>
              <RatingContainer>
                <RatingCard>
                  <RatingCategory>Cleanliness</RatingCategory>
                  <Wrapper>
                    <Rating>{cleanlinessAverage.toFixed(1)}</Rating>
                    <HotelStar src={StarIcon} />
                  </Wrapper>
                </RatingCard>
                <RatingCard>
                  <RatingCategory>Comfort</RatingCategory>
                  <Wrapper>
                    <Rating>{comfortAverage.toFixed(1)}</Rating>
                    <HotelStar src={StarIcon} />
                  </Wrapper>
                </RatingCard>
                <RatingCard>
                  <RatingCategory>Location</RatingCategory>
                  <Wrapper>
                    <Rating>{locationAverage.toFixed(1)}</Rating>
                    <HotelStar src={StarIcon} />
                  </Wrapper>
                </RatingCard>
                <RatingCard>
                  <RatingCategory>Service</RatingCategory>
                  <Wrapper>
                    <Rating>{serviceAverage.toFixed(1)}</Rating>
                    <HotelStar src={StarIcon} />
                  </Wrapper>
                </RatingCard>
              </RatingContainer>
            </RightContainer>
          </MiddleContainer>
          {hotel?.Rooms &&
            hotel?.Rooms.length > 0 &&
            hotel?.Rooms.map((room) => (
              <HotelRoomContainer>
                <Card>
                  <RoomPictureContainer>
                    <BigRoomPicture
                      src={room?.RoomPictures?.[0]?.URL || NoImageIcon}
                    />
                    <SmallRoomPictureContainer>
                      <SmallRoomPicture
                        src={room?.RoomPictures?.[1]?.URL || NoImageIcon}
                      />
                      <SmallRoomPicture
                        src={room?.RoomPictures?.[2]?.URL || NoImageIcon}
                      />
                      <SmallRoomPicture
                        src={room?.RoomPictures?.[3]?.URL || NoImageIcon}
                      />
                    </SmallRoomPictureContainer>
                  </RoomPictureContainer>
                </Card>
                <HotelInfoContainer>
                  <RoomType>{room.RoomType?.RoomTypeName}</RoomType>
                  <RoomFacilityContainer>
                    <HotelFacilityTitle>Room Facility</HotelFacilityTitle>
                    {room?.RoomFacilities && room.RoomFacilities?.length > 0 ? (
                      <FacilityContainer>
                        {room.RoomFacilities.map((facility) => (
                          <FacilityName key={facility.ID}>
                            {facility.FacilityName}
                          </FacilityName>
                        ))}
                      </FacilityContainer>
                    ) : (
                      <NoMessage>No facility.</NoMessage>
                    )}
                  </RoomFacilityContainer>
                  <RoomPriceContainer>
                    <RoomPrice>
                      {formatCurrency(parseInt(room.RoomPrice))} / night
                    </RoomPrice>
                    <ChooseButton
                      isSelected={selectedRoomId === room.ID}
                      disabled={selectedRoomId === room.ID}
                      onClick={() => handleChoose(room.ID ?? 0)}
                    >
                      {selectedRoomId === room.ID ? "Selected" : "Choose"}
                    </ChooseButton>
                  </RoomPriceContainer>
                </HotelInfoContainer>
              </HotelRoomContainer>
            ))}
          <CheckContainer>
            <CheckTitle>Choose Check In & Check Out Date</CheckTitle>
            <InOutContainer>
              <InputForm
                label="Check In Date"
                type="date"
                value={checkIn}
                onChange={(value) => setCheckIn(value)}
              />
              <InputForm
                label="Check Out Date"
                type="date"
                value={checkOut}
                onChange={(value) => setCheckOut(value)}
              />
            </InOutContainer>
            <ErrorMessage>{error}</ErrorMessage>
            <AddButton onClick={handleSubmit}>Add To Cart</AddButton>
          </CheckContainer>
          <HotelReviewContainer>
            <HotelDescriptionTitle>Hotel Review</HotelDescriptionTitle>
            <CardContainer>
              {hotel?.HotelReviews && hotel?.HotelReviews.length > 0 ? (
                <>
                  {hotel?.HotelReviews?.map((review) => (
                    <HotelReviewCard hotelReview={review} />
                  ))}
                </>
              ) : (
                <NoMessage>This hotel has no review yet.</NoMessage>
              )}
            </CardContainer>
          </HotelReviewContainer>
        </HotelContainer>
      </InnerContainer>
    </Container>
  );
};

export default ViewHotelDetailPage;
