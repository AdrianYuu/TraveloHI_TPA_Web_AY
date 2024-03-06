import styled from "@emotion/styled";
import Navbar from "../../../components/navbar";
import { useEffect, useState } from "react";
import { IFlight } from "../../../interfaces/flight-interface";
import { getFlights } from "../../../api/api-flight";
import CheckboxInputForm from "./../../../components/checkbox-input-form";
import InputForm from "../../../components/input-form";
import Footer from "../../../components/footer";
import useLanguage from "../../../contexts/language-context";
import { calculateDuration } from "../../../utils/util";
import { useNavigate } from "react-router-dom";
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
  min-width: 55rem;
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

const AirlineContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 20rem;
`;

const AirlineLogo = styled.img`
  width: 4rem;
  height: 4rem;
`;

const AirlineName = styled.p``;

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

const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LineContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LineContainerV = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Line = styled.div`
  width: 4rem;
  height: 0.1rem;
  background-color: black;
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

const Price = styled.p`
  color: #ff672c;
  font-weight: 600;
  font-size: 1rem;
`;

const PerPerson = styled.p`
  color: #687279;
  font-size: 1rem;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailButton = styled.button`
  background-color: white;
  cursor: pointer;
  color: #687279;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const AddButton = styled.button`
  height: 2.5rem;
  border-radius: 0.4rem;
  font-weight: 600;
  background-color: #2074f4;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 3rem;

  &:hover {
    background-color: #086cdc;
  }
`;

const Date = styled.p``;

const DropdownContainer = styled.div`
  display: flex;
  gap: 2rem;
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

const FilterContainer = styled.div`
  width: 24rem;
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
  min-width: 20rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckboxTitle = styled.p`
  color: #687279;
  font-weight: 600;
`;

const MaxMinPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1rem;
`;

const Duration = styled.p``;

const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const TransitCount = styled.p``;

const ChooseButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
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

const ViewFlightPage = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState<IFlight[] | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const { formatNumber, formatCurrency } = useLanguage();
  const [sortBy, setSortBy] = useState<string>("duration");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [minimumPrice, setMinimumPrice] = useState<string>("");
  const [maximumPrice, setMaximumPrice] = useState<string>("");
  const [isNoTransit, setIsNoTransit] = useState<boolean>(true);
  const [isOneTransit, setIsOneTransit] = useState<boolean>(true);
  const [isTwoOrMoreTransit, setIsTwoOrMoreTransit] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  const [searchValue, setSearchValue] = useState<string>("");
  const paginationOptions = ["20", "25", "30"];

  useEffect(() => {
    const fetchFlights = async () => {
      setFlights(await getFlights());
    };

    fetchFlights();
  }, []);

  const toggleDropdown = (flightIndex: number) => {
    setActiveDropdown((prevIndex: number | null) =>
      prevIndex === flightIndex ? null : flightIndex
    );
  };

  const isDropdownVisible = (flightIndex: number) => {
    return activeDropdown === flightIndex;
  };

  const filterByTransit = (flight: IFlight) => {
    const transitCount = flight.AirportTransits?.length || 0;

    if (isNoTransit && transitCount === 0) {
      return true;
    }

    if (isOneTransit && transitCount === 1) {
      return true;
    }

    if (isTwoOrMoreTransit && transitCount >= 2) {
      return true;
    }

    return false;
  };

  const filterByPrice = (flight: IFlight) => {
    const flightPrice = formatNumber(parseInt(flight.FlightPrice));

    if (
      parseFloat(minimumPrice) > 0 &&
      flightPrice < formatNumber(parseFloat(minimumPrice))
    ) {
      return false;
    }

    if (maximumPrice && flightPrice > formatNumber(parseFloat(maximumPrice))) {
      console.log(formatNumber(parseFloat(maximumPrice)));
      return false;
    }

    return true;
  };

  const filterByFlightCode = (flight: IFlight) => {
    return flight.FlightCode.toLowerCase().includes(searchValue.toLowerCase());
  };

  const handleSort = (criteria: string) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const sortedAndFilteredFlights = flights
    ?.filter(filterByTransit)
    .filter(filterByPrice)
    .filter(filterByFlightCode)
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "duration") {
        const durationA = calculateDuration(a.DepartureDate, a.ArrivalDate);
        const durationB = calculateDuration(b.DepartureDate, b.ArrivalDate);
        comparison = durationA!.localeCompare(durationB!);
      } else if (sortBy === "price") {
        comparison = parseFloat(a.FlightPrice) - parseFloat(b.FlightPrice);
      } else if (sortBy === "transits") {
        comparison =
          (a.AirportTransits?.length || 0) - (b.AirportTransits?.length || 0);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  return (
    <Container>
      <Navbar onSearch={handleSearch} />
      <InnerContainer>
        <FilterContainer>
          <FilterTitle>Filter:</FilterTitle>
          <TransitContainer>
            <CheckboxContainer>
              <CheckboxTitle>Transit Count</CheckboxTitle>
              <CheckboxInputForm
                label="No Transit"
                checked={isNoTransit}
                onChange={(value) => setIsNoTransit(value)}
              />
              <CheckboxInputForm
                label="1 Transit"
                checked={isOneTransit}
                onChange={(value) => setIsOneTransit(value)}
              />
              <CheckboxInputForm
                label="2 Transits or more"
                checked={isTwoOrMoreTransit}
                onChange={(value) => setIsTwoOrMoreTransit(value)}
              />
            </CheckboxContainer>
          </TransitContainer>
          <MaxMinPriceContainer>
            <CheckboxTitle>Price</CheckboxTitle>
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
          <ChooseButtonContainer>
            <CheckboxTitle>Sort</CheckboxTitle>
            <ChooseButton onClick={() => handleSort("duration")}>
              Sort by Duration
            </ChooseButton>
            <ChooseButton onClick={() => handleSort("price")}>
              Sort by Price
            </ChooseButton>
            <ChooseButton onClick={() => handleSort("transits")}>
              Sort by Transits
            </ChooseButton>
          </ChooseButtonContainer>
          <PaginationNumContainer>
            <CheckboxTitle>Pagination Amount</CheckboxTitle>
            <SelectInputForm
              label=""
              options={paginationOptions}
              value={itemsPerPage.toString()}
              onChange={(value) => handleItemsPerPageChange(value)}
            />
          </PaginationNumContainer>
        </FilterContainer>
        <CardContainer>
          {sortedAndFilteredFlights && sortedAndFilteredFlights.length > 0 ? (
            sortedAndFilteredFlights
              .slice(firstIndex, lastIndex)
              .map((flight, index) => (
                <FlightCard>
                  <UpperContainer>
                    <AirlineContainer>
                      <AirlineLogo
                        src={flight.Airplane?.Airline?.AirlinePictureURL}
                      />
                      <AirlineName>
                        {flight.Airplane?.Airline?.AirlineName} -{" "}
                        {flight.FlightCode}
                      </AirlineName>
                    </AirlineContainer>
                    <TimeContainer>
                      <FlightInformation>
                        <Time>{flight.DepartureDate.split(" ")[1]}</Time>
                        <Location>{flight.OriginAirport?.AirportCode}</Location>
                      </FlightInformation>
                      <MiddleContainer>
                        <Duration>
                          {calculateDuration(
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
                          {flight.AirportTransits?.length === 0 ? (
                            <>Direct</>
                          ) : (
                            flight.AirportTransits?.length + " transit"
                          )}
                        </TransitCount>
                      </MiddleContainer>
                      <FlightInformation>
                        <Time>{flight.ArrivalDate.split(" ")[1]}</Time>
                        <Location>
                          {flight.DestinationAirport?.AirportCode}
                        </Location>
                      </FlightInformation>
                    </TimeContainer>
                    <PriceContainer>
                      <Price>
                        {formatCurrency(parseInt(flight.FlightPrice))}
                      </Price>
                      <PerPerson>/person</PerPerson>
                    </PriceContainer>
                  </UpperContainer>
                  <BottomContainer>
                    <DetailButton onClick={() => toggleDropdown(index)}>
                      Detail
                    </DetailButton>
                    <AddButton
                      onClick={() =>
                        navigate(`/view-flight-detail/${flight.ID}`)
                      }
                    >
                      Choose
                    </AddButton>
                  </BottomContainer>
                  {isDropdownVisible(index) && (
                    <DropdownContainer>
                      <LeftDropdownContainer>
                        <BottomTimeContainer>
                          <Time>{flight.DepartureDate.split(" ")[1]}</Time>
                          <Date>{flight.DepartureDate.split(" ")[0]}</Date>
                        </BottomTimeContainer>
                        <LineContainerV>
                          <Circle />
                          <LineV />
                          <Circle />
                        </LineContainerV>
                        <BottomTimeContainer>
                          <Time>{flight.ArrivalDate.split(" ")[1]}</Time>
                          <Date>{flight.ArrivalDate.split(" ")[0]}</Date>
                        </BottomTimeContainer>
                      </LeftDropdownContainer>
                      <RightDropdownContainer>
                        <CityInformation>
                          <CityName>
                            {flight.OriginAirport?.City.CityName}
                          </CityName>
                          <AirportName>
                            {flight.OriginAirport?.AirportName}
                          </AirportName>
                        </CityInformation>
                        {flight.AirportTransits?.map((transit) => (
                          <CityInformation>
                            <CityName>
                              {transit.Airport?.City.CityName}
                            </CityName>
                            <AirportName>
                              {transit.Airport?.AirportName}
                            </AirportName>
                          </CityInformation>
                        ))}
                        <CityInformation>
                          <CityName>
                            {flight.DestinationAirport?.City.CityName}
                          </CityName>
                          <AirportName>
                            {flight.DestinationAirport?.AirportName}
                          </AirportName>
                        </CityInformation>
                      </RightDropdownContainer>
                    </DropdownContainer>
                  )}
                </FlightCard>
              ))
          ) : (
            <NoMessage>No flights available.</NoMessage>
          )}
          {sortedAndFilteredFlights && sortedAndFilteredFlights.length > 0 && (
            <PaginationContainer>
              <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
                Prev
              </PaginationButton>
              <PaginationInfo>
                Page {currentPage} of{" "}
                {Math.ceil(sortedAndFilteredFlights.length / itemsPerPage)}
              </PaginationInfo>
              <PaginationButton
                onClick={nextPage}
                disabled={
                  currentPage ===
                  Math.ceil(sortedAndFilteredFlights.length / itemsPerPage)
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

export default ViewFlightPage;
