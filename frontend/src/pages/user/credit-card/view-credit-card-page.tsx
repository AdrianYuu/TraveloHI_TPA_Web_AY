import styled from "@emotion/styled";
import Navbar from "../../../components/navbar";
import useUser from "../../../contexts/user-context";
import { Link, useNavigate } from "react-router-dom";
import PointIcon from "../../../assets/Point_Icon.png";
import CardIcon from "../../../assets/Card_Icon.png";
import SettingsIcon from "../../../assets/Settings_Icon.png";
import LogoutIcon from "../../../assets/Logout_Icon.png";
import { useEffect, useState } from "react";
import { ICreditCard } from "../../../interfaces/credit-card-interface";
import CreditCard from "../../../components/credit-card";
import { getCreditCards } from "../../../api/api-credit-card";
import Footer from "../../../components/footer";
import WalletIcon from "../../../assets/Wallet_Icon.png";

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

const ProfileContainer = styled.div`
  display: flex;
  width: 55rem;
  margin-top: 2rem;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const LeftContainer = styled.div`
  border: 1px solid #e1e3e3;
  border-radius: 1rem;
  width: 35%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

const RightContainer = styled.div`
  width: 65%;
  border: 1px solid #e1e3e3;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: flex-start;
`;

const PictureSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Picture = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const Information = styled.p`
  font-weight: 600;
  font-size: 1rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const NavLink = styled(Link)`
  font-weight: 600;
  font-size: 0.9rem;
  color: #687279;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LineBreak = styled.div`
  background-color: #e1e3e3;
  height: 0.1rem;
  margin-bottom: 1rem;
`;

const NoMessage = styled.p`
  color: #555;
  font-size: 1rem;
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ViewCreditCardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [creditCards, setCreditCards] = useState<ICreditCard[] | null>(null);

  useEffect(() => {
    const fetchCreditCards = async () => {
      setCreditCards(
        await getCreditCards(user?.ID !== undefined ? user?.ID : -1)
      );
    };

    fetchCreditCards();
  }, []);

  const handleLogout = () => {
    logout(user?.ID ?? 0);
    navigate("/");
  };

  return (
    <Container>
      <Navbar />
      <InnerContainer>
        <ProfileContainer>
          <LeftContainer>
            <PictureSection>
              <Picture src={user?.ProfilePictureURL} />
              <Information>
                {user?.FirstName} {user?.LastName}
              </Information>
            </PictureSection>
            <LineBreak />
            <Section>
              <SectionContainer>
                <Icon src={PointIcon} />
                <NavLink to="/view-point">My Point</NavLink>
              </SectionContainer>
              <SectionContainer>
                <Icon src={CardIcon} />
                <NavLink to="/view-credit-card">My Card</NavLink>
              </SectionContainer>
              <SectionContainer>
                <Icon src={WalletIcon} />
                <NavLink to="/view-wallet">HI Wallet</NavLink>
              </SectionContainer>
            </Section>
            <LineBreak />
            <Section>
              <SectionContainer>
                <Icon src={SettingsIcon} />
                <NavLink to="/view-profile">My Account</NavLink>
              </SectionContainer>
              <SectionContainer>
                <Icon src={LogoutIcon} />
                <NavLink to="/" onClick={handleLogout}>
                  Log out
                </NavLink>
              </SectionContainer>
            </Section>
          </LeftContainer>
          <RightContainer>
            <TitleContainer>
              <Title>Credit Card Information</Title>
              <NavLink to="/create-credit-card">Add Credit Card</NavLink>
            </TitleContainer>
            {creditCards && creditCards?.length > 0 ? (
              creditCards.map((card, index) => (
                <CreditCard
                  key={index}
                  cardNumber={card.CardNumber}
                  bankName={card.BankName}
                  CVV={card.CVV}
                  expiryDate={card.ExpiryDate}
                />
              ))
            ) : (
              <NoMessage>No Credit Cards records found.</NoMessage>
            )}
          </RightContainer>
        </ProfileContainer>
      </InnerContainer>
      <Footer />
    </Container>
  );
};

export default ViewCreditCardPage;
