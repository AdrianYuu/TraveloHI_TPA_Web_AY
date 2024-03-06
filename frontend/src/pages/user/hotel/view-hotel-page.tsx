import styled from "@emotion/styled";
import Navbar from "../../../components/navbar";
import { useEffect, useState } from "react";
import { IHotel } from "../../../interfaces/hotel-interface";
import { getHotels } from "../../../api/api-hotel";
import LocationIcon from "../../../assets/Location_Icon.png";
import NoImageIcon from "../../../assets/No_Image_Icon.jpg";
import { useNavigate } from "react-router-dom";
import InputForm from "../../../components/input-form";
import Footer from "../../../components/footer";
import useLanguage from "../../../contexts/language-context";
import StarIcon from "../../../assets/Star_Icon.png";
import { IHotelReview } from "../../../interfaces/hotel-review-interface";
import { IHotelFacility } from "../../../interfaces/hotel-facility-interface";
import { getHotelFacilities } from "../../../api/api-hotel-facilities";
import SelectInputForm from "../../../components/select-input-form";

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

const CardContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 60rem;
`;

const FilterContainer = styled.div`
  width: 19rem;
  padding: 0 2rem 2rem 2rem;
`;

const FilterTitle = styled.p`
  font-weight: 600;
  font-size: 1rem;
  color: black;
  margin-bottom: 1rem;
`;

const NoMessage = styled.p`
  color: #555;
`;

const TransitContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const HotelCard = styled.div`
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  background-color: white;
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

const Location = styled.img`
  width: 1rem;
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

const PriceContainer = styled.div`
  display: flex;
  justify-content: end;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  min-width: 10rem;
`;

const PriceText = styled.p`
  text-align: end;
  color: #ff5c1c;
  font-weight: 600;
  font-size: 1.2rem;
`;

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

const ButtonContainer = styled.div``;

const ChooseButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const MaxMinPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  gap: 1rem;
  width: 100%;
`;

const HotelStarContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
`;

const HotelStar = styled.img`
  width: 1rem;
`;

const Title = styled.p`
  color: #687279;
  font-weight: 600;
`;

const AverageRating = styled.p`
  margin-top: 0.5rem;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Checkbox = styled.input``;

const Label = styled.p`
  font-size: 1rem;
  color: #687279;
  font-weight: 600;
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid #ddd;
  margin-top: 0.5rem;
`;

const Th = styled.th`
  padding: 8px;
  text-align: left;
`;

const ThSelect = styled.th`
  padding: 8px;
  text-align: left;
  width: 1rem;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  height: 100%;
`;

const TableCell = styled.td`
  padding: 8px;
`;

const CheckboxCell = styled.td`
  display: flex;
  justify-content: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const PaginationButton = styled.button`
  background-color: white;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PaginationInfo = styled.p`
  font-weight: 600;
`;

const PaginationNumContainer = styled.div`
  margin-top: 2rem;
`;

const ViewHotelPage = () => {
  const navigate = useNavigate();
  const { formatCurrency } = useLanguage();

  const [hotels, setHotels] = useState<IHotel[] | null>(null);
  const [filteredHotels, setFilteredHotels] = useState<IHotel[] | null>(null);
  const [minimumPrice, setMinimumPrice] = useState<string>("");
  const [maximumPrice, setMaximumPrice] = useState<string>("");
  const [minimumRating, setMinimumRating] = useState<string>("");
  const [maximumRating, setMaximumRating] = useState<string>("");
  const [sortByRatingAsc, setSortByRatingAsc] = useState(true);
  const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  const [hotelFacilities, setHotelFacilities] = useState<
    IHotelFacility[] | null
  >(null);
  const [selectedFacilities, setSelectedFacilities] = useState<
    IHotelFacility[]
  >([]);

  const [searchValue, setSearchValue] = useState<string>("");

  const paginationOptions = ["20", "25", "30"];

  useEffect(() => {
    const fetchHotels = async () => {
      setHotels(await getHotels());
      setFilteredHotels(await getHotels());
      setHotelFacilities(await getHotelFacilities());
      console.log(hotels);
    };

    fetchHotels();
  }, []);

  const handleFacilitySelection = (facility: IHotelFacility) => {
    if (isSelected(facility)) {
      setSelectedFacilities((prevFacilities) =>
        prevFacilities.filter((selected) => selected.ID !== facility.ID)
      );
    } else {
      setSelectedFacilities((prevFacilities) => [...prevFacilities, facility]);
    }
  };

  const isSelected = (facility: IHotelFacility) =>
    selectedFacilities.some((selected) => selected.ID === facility.ID);

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

  const getCheapestRoomPrice = (hotel: IHotel): number => {
    const rooms = hotel.Rooms;
    if (rooms && rooms.length > 0) {
      let minPrice = parseInt(rooms[0].RoomPrice);
      for (let i = 1; i < rooms.length; i++) {
        if (parseInt(rooms[i].RoomPrice) < minPrice) {
          minPrice = parseInt(rooms[i].RoomPrice);
        }
      }
      return minPrice;
    }
    return 0;
  };

  const filterByPrice = (hotel: IHotel): boolean => {
    const cheapestRoomPrice = getCheapestRoomPrice(hotel);

    if (minimumPrice && cheapestRoomPrice < parseFloat(minimumPrice)) {
      return false;
    }

    if (maximumPrice && cheapestRoomPrice > parseFloat(maximumPrice)) {
      return false;
    }

    return true;
  };

  const filterByHotelName = (hotel: IHotel): boolean => {
    return hotel.HotelName.toLowerCase().includes(searchValue.toLowerCase());
  };

  const filterByRating = (hotel: IHotel): boolean => {
    const averageRating = calculateAverageRating(hotel.HotelReviews);

    if (minimumRating && averageRating < parseFloat(minimumRating)) {
      return false;
    }

    if (maximumRating && averageRating > parseFloat(maximumRating)) {
      return false;
    }

    return true;
  };

  const filterByFacilities = (hotel: IHotel): boolean => {
    if (selectedFacilities.length === 0) return true;
    return selectedFacilities.every((facility) =>
      hotel.HotelFacilities?.some((f) => f.ID === facility.ID)
    );
  };

  const filterHotels = (hotel: IHotel): boolean => {
    return (
      filterByPrice(hotel) &&
      filterByHotelName(hotel) &&
      filterByRating(hotel) &&
      filterByFacilities(hotel)
    );
  };

  useEffect(() => {
    if (hotels) {
      const updatedHotels = hotels.filter(filterHotels);
      setFilteredHotels(updatedHotels);
    }
  }, [
    searchValue,
    hotels,
    minimumPrice,
    maximumPrice,
    minimumRating,
    maximumRating,
    selectedFacilities,
  ]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSortByRating = () => {
    if (filteredHotels) {
      const sortedHotels = [...filteredHotels].sort((a, b) => {
        const ratingA = calculateAverageRating(a.HotelReviews);
        const ratingB = calculateAverageRating(b.HotelReviews);
        return sortByRatingAsc ? ratingA - ratingB : ratingB - ratingA;
      });
      setFilteredHotels(sortedHotels);
      setSortByRatingAsc(!sortByRatingAsc);
    }
  };

  const handleSortByPrice = () => {
    if (filteredHotels) {
      const sortedHotels = [...filteredHotels].sort((a, b) => {
        const cheapestRoomPriceA = getCheapestRoomPrice(a);
        const cheapestRoomPriceB = getCheapestRoomPrice(b);
        return sortByPriceAsc
          ? cheapestRoomPriceA - cheapestRoomPriceB
          : cheapestRoomPriceB - cheapestRoomPriceA;
      });
      setFilteredHotels(sortedHotels);
      setSortByPriceAsc(!sortByPriceAsc);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  return (
    <Container>
      <Navbar onSearch={handleSearch} />
      <InnerContainer>
        <FilterContainer>
          <FilterTitle>Filter:</FilterTitle>
          <TransitContainer>
            <MaxMinPriceContainer>
              <Title>Price</Title>
              <InputForm
                label="Minimum Price"
                type="number"
                value={minimumPrice}
                onChange={(value) => setMinimumPrice(value)}
              />
              <InputForm
                label="Maximum Price"
                type="number"
                value={maximumPrice}
                onChange={(value) => setMaximumPrice(value)}
              />
            </MaxMinPriceContainer>
            <MaxMinPriceContainer>
              <Title>Rating</Title>
              <InputForm
                label="Minimum Rating"
                type="number"
                value={minimumRating}
                onChange={(value) => setMinimumRating(value)}
              />
              <InputForm
                label="Maximum Rating"
                type="number"
                value={maximumRating}
                onChange={(value) => setMaximumRating(value)}
              />
            </MaxMinPriceContainer>
          </TransitContainer>
          {hotelFacilities && hotelFacilities.length > 0 && (
            <HotelFacilityContainer>
              <Label>Facility</Label>
              <Table>
                <Thead>
                  <Tr>
                    <ThSelect>Select</ThSelect>
                    <Th>Facility Name</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {hotelFacilities.map((facility, index) => (
                    <Tr key={index}>
                      <CheckboxCell>
                        <Checkbox
                          type="checkbox"
                          id={`facility-${facility.ID}`}
                          checked={isSelected(facility)}
                          onChange={() => handleFacilitySelection(facility)}
                        />
                      </CheckboxCell>
                      <TableCell>{facility.FacilityName}</TableCell>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </HotelFacilityContainer>
          )}
          <ChooseButtonContainer>
            <Label>Sort</Label>
            <ChooseButton onClick={handleSortByRating}>
              Sort by Rating
            </ChooseButton>
            <ChooseButton onClick={handleSortByPrice}>
              Sort by Price
            </ChooseButton>
          </ChooseButtonContainer>
          <PaginationNumContainer>
            <Label>Pagination Amount</Label>
            <SelectInputForm
              label=""
              options={paginationOptions}
              value={itemsPerPage.toString()}
              onChange={(value) => handleItemsPerPageChange(value)}
            />
          </PaginationNumContainer>
        </FilterContainer>
        <CardContainer>
          {filteredHotels && filteredHotels.length > 0 ? (
            filteredHotels.slice(firstIndex, lastIndex).map((hotel, index) => (
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
                    <Location src={LocationIcon} />
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
                <PriceContainer>
                  <PriceText>{getCheapestRoom(hotel)}</PriceText>
                  <ButtonContainer>
                    <ChooseButton
                      disabled={getCheapestRoom(hotel) === "No Room"}
                      onClick={() => navigate(`/view-hotel-detail/${hotel.ID}`)}
                    >
                      Choose Room
                    </ChooseButton>
                  </ButtonContainer>
                </PriceContainer>
              </HotelCard>
            ))
          ) : (
            <NoMessage>No hotels available.</NoMessage>
          )}
          {filteredHotels && filteredHotels.length > 0 && (
            <PaginationContainer>
              <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
                Prev
              </PaginationButton>
              <PaginationInfo>
                Page {currentPage} of{" "}
                {Math.ceil(filteredHotels.length / itemsPerPage)}
              </PaginationInfo>
              <PaginationButton
                onClick={nextPage}
                disabled={
                  currentPage ===
                  Math.ceil(filteredHotels.length / itemsPerPage)
                }
              >
                Next
              </PaginationButton>
            </PaginationContainer>
          )}
        </CardContainer>
      </InnerContainer>
      <Footer />
    </Container>
  );
};

export default ViewHotelPage;
