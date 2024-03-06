import styled from "@emotion/styled";
import Navbar from "../../../components/navbar";
import SearchIcon from "../../../assets/Search_Icon.png";
import DotSquare from "../../../assets/Dot_Square.png";
import HotelIcon from "../../../assets/Hotel_Icon.png";
import FlightIcon from "../../../assets/Flight_Icon.png";
import { useEffect, useState } from "react";
import { IPromo } from "../../../interfaces/promo-interface";
import { getPromos } from "../../../api/api-promo";
import Footer from "../../../components/footer";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #0ca8e8;
  gap: 2rem;
  border-radius: 0 0 3rem 3rem;
  width: 100%;
  height: 10rem;
  padding-top: 2rem;
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderTitle = styled.p`
  color: white;
  font-weight: 600;
  font-size: 1.6rem;
`;

const HeaderBody = styled.p`
  color: white;
  font-weight: 400;
  font-size: 1rem;
`;

const SearchBar = styled.div`
  display: flex;
  width: 28rem;
  border-radius: 1rem;
  background-color: white;
  height: 2.2rem;
  margin-top: 0.75rem;
`;

const SearchImg = styled.img`
  width: 20px;
  height: 20px;
  padding: 0.5rem 0.8rem;
`;

const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  background-color: white;
  border-radius: 1rem;
  font-size: 1rem;
  padding-right: 1.3rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: -70px;
`;

const FilterBox = styled.div`
  display: flex;
  gap: 2rem;
  background-color: white;
  height: 3rem;
  border-radius: 0.8rem;
  padding: 2rem 3rem;
  width: 52rem;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
`;

const FilterCard = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
`;

const FilterTitle = styled.p`
  font-size: 0.8rem;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const PromoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: -70px;
`;

const PromoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 0 3rem 0 3rem;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
`;

const PromoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PromoTitle = styled.p`
  font-weight: 600;
  font-size: 1rem;
`;

const PromoBody = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PromoCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  width: 18rem;
`;

const PromoImage = styled.img`
  width: 18rem;
  height: 10rem;
  border-radius: 0.5rem 0.5rem 0 0;
`;

const PromoCardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 2rem;
`;

const PromoCardTitle = styled.p`
  font-weight: 600;
  font-size: 1rem;
`;

const PromoCardButton = styled.button`
  background-color: #0894f4;
  padding: 0.8rem 1.8rem;
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #087cec;
  }
`;

const PromoCardDescription = styled.p`
  font-weight: 400;
`;

const ViewPromoPage = () => {
  const [promos, setPromos] = useState<IPromo[] | null>(null);

  useEffect(() => {
    const fetchPromos = async () => {
      setPromos(await getPromos());
    };

    fetchPromos();
  }, []);

  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <HeaderContainer>
          <HeaderInnerContainer>
            <HeaderTitle>Find promo for your holiday</HeaderTitle>
            <HeaderBody>
              Whatever your travel plans, find the best deals here
            </HeaderBody>
          </HeaderInnerContainer>
          <SearchBar>
            <SearchImg src={SearchIcon}></SearchImg>
            <SearchInput></SearchInput>
          </SearchBar>
        </HeaderContainer>
        <FilterContainer>
          <FilterBox>
            <FilterCard>
              <Icon src={DotSquare} />
              <FilterTitle>All</FilterTitle>
            </FilterCard>
            <FilterCard>
              <Icon src={FlightIcon} />
              <FilterTitle>Flight Ticket</FilterTitle>
            </FilterCard>
            <FilterCard>
              <Icon src={HotelIcon} />
              <FilterTitle>Booking Hotel</FilterTitle>
            </FilterCard>
          </FilterBox>
        </FilterContainer>
        <PromoContainer>
          <PromoSection>
            <PromoHeader>
              <Icon src={FlightIcon} />
              <PromoTitle>Flight Ticket</PromoTitle>
            </PromoHeader>
            <PromoBody>
              {promos
                ?.filter((promo) => promo.PromoType === "Flight Ticket")
                .map((promo) => (
                  <PromoCard key={promo.ID}>
                    <PromoImage src={promo.PromoPictureURL} />
                    <PromoCardBody>
                      <PromoCardTitle>{promo.PromoCode}</PromoCardTitle>
                      <PromoCardDescription>
                        {promo.PromoDescription}
                      </PromoCardDescription>
                      <PromoCardButton>Detail</PromoCardButton>
                    </PromoCardBody>
                  </PromoCard>
                ))}
              {(!promos ||
                !promos.some(
                  (promo) => promo.PromoType === "Flight Ticket"
                )) && <p>No flight ticket promos available</p>}
            </PromoBody>
          </PromoSection>

          <PromoSection>
            <PromoHeader>
              <Icon src={HotelIcon} />
              <PromoTitle>Booking Hotel</PromoTitle>
            </PromoHeader>
            <PromoBody>
              {promos
                ?.filter((promo) => promo.PromoType === "Booking Hotel")
                .map((promo) => (
                  <PromoCard key={promo.ID}>
                    <PromoImage src={promo.PromoPictureURL} />
                    <PromoCardBody>
                      <PromoCardTitle>{promo.PromoCode}</PromoCardTitle>
                      <PromoCardDescription>
                        {promo.PromoDescription}
                      </PromoCardDescription>
                      <PromoCardButton>Button</PromoCardButton>
                    </PromoCardBody>
                  </PromoCard>
                ))}
              {(!promos ||
                !promos.some(
                  (promo) => promo.PromoType === "Booking Hotel"
                )) && <p>No hotel booking promos available</p>}
            </PromoBody>
          </PromoSection>
        </PromoContainer>
      </InnerContainer>
      <Footer />
    </Container>
  );
};

export default ViewPromoPage;
