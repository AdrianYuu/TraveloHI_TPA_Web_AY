import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import IndonesiaFlag from "../assets/Indonesia_Flag.png";
import AmericaFlag from "../assets/America_Flag.png";
import SearchIcon from "../assets/Search_Icon.png";
import ProfileIcon from "../assets/Profile_Icon.png";
import useUser from "../contexts/user-context";
import useLanguage from "../contexts/language-context";
import CartIcon from "../assets/Cart_Icon.png";
import { useTheme } from "../contexts/theme-context";
import DarkIcon from "../assets/Dark_Theme.png";
import LightIcon from "../assets/Light_Theme.png";
import WalletIcon from "../assets/Wallet_Icon.png";
import CreditCardIcon from "../assets/Card_Icon.png";
import OrderIcon from "../assets/Order_Icon.png";
import HistoryIcon from "../assets/History_Icon.png";

import { useEffect, useRef, useState } from "react";
import { IFlightTicket } from "../interfaces/flight-ticket-interface";
import { IHotelBooking } from "../interfaces/hotel-booking-interface";
import { getHotelBookingsPaid } from "../api/api-hotel-booking";
import { getFlightTicketsPaid } from "../api/api-flight-ticket";
import { ISearchHistory } from "../interfaces/search-history-interface";
import {
  createSearchHistory,
  getSearchHistory,
  getTop5SearchHistory,
} from "../api/api-search-history";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: white;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 600;
  font-size: 1rem;
`;

const CompanyIcon = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 2rem;
  color: #0ca8e8;
  cursor: pointer;
`;

const NavItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
  border: 0.1px solid grey;
  border-radius: 1rem;
`;

const DropDownLink = styled.div`
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  width: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  width: 28rem;
  border-radius: 1rem;
  background-color: #e0dcdc;
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
  background-color: #e0dcdc;
  border-radius: 1rem;
  font-size: 1rem;
  padding-right: 1.3rem;
`;

const RegisterButton = styled(Link)`
  background-color: #309cd4;
  border: none;
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 0.3rem;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #087cec;
  }
`;

const Cart = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const Username = styled.p``;

const Greybox = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f8f4f4;
  padding: 1rem 1.5rem;
  gap: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const ThemeButton = styled.div`
  cursor: pointer;
  margin-right: 1rem;
`;

const LogoutButton = styled(Link)`
  background-color: #309cd4;
  border: none;
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 0.3rem;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #087cec;
  }
`;

const ImageTheme = styled.img`
  width: 2rem;
`;

const ChangeLanguageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const DropdownLanguageContainer = styled.div`
  position: absolute;
  background-color: white;
  width: 8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.4rem;
  border: 1px solid grey;
  border-radius: 0.5rem;
  top: calc(100% + 10px);
`;

const CountryButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PaymentContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const DropdownPaymentContainer = styled.div`
  position: absolute;
  background-color: white;
  width: 10rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0.8rem;
  gap: 0.4rem;
  border: 1px solid grey;
  border-radius: 0.5rem;
  top: calc(100% + 10px);
`;

const Title = styled.p`
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const PaymentIcon = styled.img`
  width: 2rem;
`;

const PaymentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const PaymentText = styled.p``;

const TitleDesc = styled.p`
  margin-bottom: 0.5rem;
`;

const OrderCounter = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #309cd4;
`;

const DropdownContainer = styled.div`
  position: absolute;
  background-color: #e0dcdc;
  max-width: 43rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.4rem;
  top: 3.8rem;
  border-radius: 1rem;
  padding: 0.5rem;
  padding-bottom: 1.5rem;
`;

const DropdownItem = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SearchBarWrapper = styled.div``;

const Label = styled.p`
  padding: 1rem;
  font-weight: 600;
`;

const DropdownItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NoMessage = styled.p`
  color: #555;
  margin-left: 1rem;
`;

interface NavbarProps {
  onSearch?: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const { user, refetchUser } = useUser();
  const { language, setLanguage } = useLanguage();
  const { theme, changeTheme } = useTheme();
  const { logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchHistory, setSearchHistory] = useState<ISearchHistory[] | null>(
    null
  );
  const [topSearchHistory, setTopSearchHistory] = useState<
    ISearchHistory[] | null
  >(null);

  const [flightTicket, setFlightTicket] = useState<IFlightTicket[] | null>(
    null
  );

  const [hotelBooking, setHotelBooking] = useState<IHotelBooking[] | null>(
    null
  );

  const [isOpenLanguage, setOpenLanguage] = useState<boolean>(false);
  const [isOpenPayment, setOpenPayment] = useState<boolean>(false);

  const [order, setOrder] = useState<number>(0);

  const fetchTicket = async () => {
    const validFlightTickets = await getFlightTicketsPaid(user?.ID ?? -1);
    if (validFlightTickets) {
      setFlightTicket(
        validFlightTickets.filter(
          (flight) =>
            new Date(flight?.Flight?.DepartureDate ?? "") >= new Date()
        )
      );
    }
  };

  const fetchBooking = async () => {
    const validHotelBookings = await getHotelBookingsPaid(user?.ID ?? -1);
    if (validHotelBookings) {
      setHotelBooking(
        validHotelBookings.filter(
          (hotel) => new Date(hotel?.CheckInDate ?? "") >= new Date()
        )
      );
    }
  };

  const fetchSearchHistory = async () => {
    setSearchHistory(await getSearchHistory(user?.ID ?? 0));
    setTopSearchHistory(await getTop5SearchHistory());
  };

  useEffect(() => {
    fetchTicket();
    fetchBooking();
    fetchSearchHistory();
  }, [user]);

  useEffect(() => {
    setOrder((flightTicket?.length ?? 0) + (hotelBooking?.length ?? 0));
  }, [flightTicket, hotelBooking]);

  useEffect(() => {
    const fetchUser = async () => {
      await refetchUser();
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout(user?.ID ?? -1);
    navigate("/");
  };

  const handleDropDownLanguage = () => {
    setOpenLanguage(!isOpenLanguage);
  };

  const handleDropDownPayment = () => {
    setOpenPayment(!isOpenPayment);
  };

  const handleChangeLanguage = (language: string) => {
    setLanguage(language);
    setOpenLanguage(false);
  };

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSelect = (option: string) => {
    setSearchValue(option);
    if (onSearch) {
      onSearch(option);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const searchHistory: ISearchHistory = {
      UserID: user?.ID ?? 0,
      Searched: searchValue,
    };
    await createSearchHistory(searchHistory);
    fetchSearchHistory();
  };

  return (
    <>
      <Container>
        <ThemeButton onClick={changeTheme}>
          {theme?.theme == "Light" ? (
            <ImageTheme src={LightIcon} />
          ) : (
            <ImageTheme src={DarkIcon} />
          )}
        </ThemeButton>
        <CompanyIcon onClick={() => navigate("/")}>TraveloHI</CompanyIcon>
        <NavContainer>
          <SearchBarWrapper ref={searchRef}>
            <SearchBar>
              <SearchImg src={SearchIcon}></SearchImg>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
                onClick={() => setIsOpen(true)}
                onKeyDown={handleKeyPress}
              />
            </SearchBar>
            {isOpen && (
              <DropdownContainer>
                <Label>Top Recommendation</Label>
                <DropdownItemWrapper>
                  {topSearchHistory && topSearchHistory.length > 0 ? (
                    <>
                      {topSearchHistory?.map((option, index) => (
                        <DropdownItem
                          key={index}
                          onClick={() => handleSelect(option.Searched ?? "")}
                        >
                          {option.Searched ?? ""}
                        </DropdownItem>
                      ))}
                    </>
                  ) : (
                    <NoMessage>No top search history available.</NoMessage>
                  )}
                </DropdownItemWrapper>
                <Label>Search History</Label>
                <DropdownItemWrapper>
                  {searchHistory && searchHistory.length > 0 ? (
                    <>
                      {searchHistory?.map((option, index) => (
                        <DropdownItem
                          key={index}
                          onClick={() => handleSelect(option.Searched ?? "")}
                        >
                          {option.Searched ?? ""}
                        </DropdownItem>
                      ))}
                    </>
                  ) : (
                    <NoMessage>No search history available.</NoMessage>
                  )}
                </DropdownItemWrapper>
              </DropdownContainer>
            )}
          </SearchBarWrapper>
          {user?.RoleID === 1 && (
            <>
              <NavLink to="/admin">Admin Page</NavLink>
            </>
          )}
          {user?.RoleID === 2 && (
            <>
              <NavItemContainer>
                <Cart src={CartIcon} />
                <NavLink to="/view-cart">My Cart</NavLink>
              </NavItemContainer>
              <NavItemContainer>
                <Cart src={OrderIcon} />
                <NavLink to="/view-order">My Order</NavLink>
                <OrderCounter>{order}</OrderCounter>
              </NavItemContainer>
              <NavItemContainer>
                <Cart src={HistoryIcon} />
                <NavLink to="/view-history">My History</NavLink>
              </NavItemContainer>
            </>
          )}
          <NavItemContainer>
            <ChangeLanguageContainer>
              <CountryButton onClick={handleDropDownLanguage}>
                {language?.language === "Indonesia" ? (
                  <>
                    <Image src={IndonesiaFlag}></Image>
                    <DropDownLink>IDR</DropDownLink>
                  </>
                ) : (
                  <>
                    <Image src={AmericaFlag}></Image>
                    <DropDownLink>USD</DropDownLink>
                  </>
                )}
              </CountryButton>
              {isOpenLanguage && (
                <DropdownLanguageContainer>
                  <CountryButton
                    onClick={() => handleChangeLanguage("Indonesia")}
                  >
                    <Image src={IndonesiaFlag}></Image>
                    <DropDownLink>Indonesia</DropDownLink>
                  </CountryButton>
                  <CountryButton
                    onClick={() => handleChangeLanguage("English")}
                  >
                    <Image src={AmericaFlag}></Image>
                    <DropDownLink>America</DropDownLink>
                  </CountryButton>
                </DropdownLanguageContainer>
              )}
            </ChangeLanguageContainer>
          </NavItemContainer>

          <NavItemContainer>
            <PaymentContainer>
              <DropDownLink onClick={handleDropDownPayment}>Pay</DropDownLink>
              {isOpenPayment && (
                <DropdownPaymentContainer>
                  <Title>Payment</Title>
                  <TitleDesc>From TraveloHI</TitleDesc>
                  <PaymentInfo onClick={() => navigate("/view-wallet")}>
                    <PaymentIcon src={WalletIcon} />
                    <PaymentText>Hi Wallet</PaymentText>
                  </PaymentInfo>
                  <PaymentInfo onClick={() => navigate("/view-credit-card")}>
                    <PaymentIcon src={CreditCardIcon} />
                    <PaymentText>Credit Card</PaymentText>
                  </PaymentInfo>
                </DropdownPaymentContainer>
              )}
            </PaymentContainer>
          </NavItemContainer>
          {user ? (
            <>
              <NavItemContainer>
                <Profile onClick={() => navigate("/view-profile")}>
                  <Image src={user.ProfilePictureURL}></Image>
                  <Username>{user.FirstName}</Username>
                </Profile>
              </NavItemContainer>
              <NavItemContainer>
                <LogoutButton to="/" onClick={handleLogout}>
                  Log out
                </LogoutButton>
              </NavItemContainer>
            </>
          ) : (
            <>
              <NavItemContainer>
                <Image src={ProfileIcon}></Image>
                <NavLink to="/login">Log in</NavLink>
              </NavItemContainer>
              <NavItemContainer>
                <RegisterButton to="/register">Register</RegisterButton>
              </NavItemContainer>
            </>
          )}
        </NavContainer>
      </Container>
      <Greybox>
        {user && (
          <>
            <NavItemContainer>
              <NavLink to="/view-flight">Flight</NavLink>
            </NavItemContainer>
            <NavItemContainer>
              <NavLink to="/view-hotel">Hotel</NavLink>
            </NavItemContainer>
            <NavItemContainer>
              <NavLink to="/view-promo">Promo</NavLink>
            </NavItemContainer>
            <NavItemContainer>
              <NavLink to="/check-location">Check Location</NavLink>
            </NavItemContainer>
            <NavItemContainer>
              <NavLink to="/game">Game</NavLink>
            </NavItemContainer>
          </>
        )}
      </Greybox>
    </>
  );
};

export default Navbar;
