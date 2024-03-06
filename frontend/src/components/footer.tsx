import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/theme-context";
import FooterLogo from "../assets/Footer_Logo.png";

const Container = styled.div`
  background-color: #1c2930;
  height: 14 rem;
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavLinkExternal = styled.a`
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  color: #a9adb0;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  color: #a9adb0;
`;

const CurrentTheme = styled.p`
  color: white;
`;

const FooterImage = styled.img`
  width: 12rem;
  height: 4rem;
`;

const Footer = () => {
  const { theme } = useTheme();

  return (
    <Container>
      <InnerContainer>
        <FooterImage src={FooterLogo} />
        <LinkContainer>
          <NavLinkExternal href="https://www.traveloka.com/id-id/how-to/bookflight">
            How to order
          </NavLinkExternal>
          <NavLinkExternal href="https://www.traveloka.com/id-id/contactus">
            Contact us
          </NavLinkExternal>
          <NavLinkExternal href="https://www.traveloka.com/id-id/help">
            Help
          </NavLinkExternal>
          <NavLinkExternal href="https://www.traveloka.com/en-id/careers">
            Careers
          </NavLinkExternal>
          <NavLinkExternal href="https://www.traveloka.com/id-id/about-us">
            About us
          </NavLinkExternal>
        </LinkContainer>
        <LinkContainer>
          <NavLink to="/view-hotel">View Hotel</NavLink>
          <NavLink to="/view-promo">View Promo</NavLink>
          <NavLink to="/view-flight">View Flight</NavLink>
          <NavLink to="/">Home</NavLink>
        </LinkContainer>
        <CurrentTheme>{theme?.theme}</CurrentTheme>
      </InnerContainer>
    </Container>
  );
};

export default Footer;
