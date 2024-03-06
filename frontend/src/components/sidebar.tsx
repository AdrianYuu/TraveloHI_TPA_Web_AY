import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  jusitfy-content: center;
  min-width: 16rem;
  background-color: #0ca8e8;
  padding-top: 1.8rem;
`;

const CompanyIcon = styled(Link)`
  font-size: 2rem;
  font-weight: 600;
  width: 100%;
  text-align: center;
  color: white;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1rem;
`;

const SidebarButton = styled(Link)<ISidebarButton>`
  padding: 0.8rem 2rem;
  border-radius: 0.4rem;
  background-color: ${(props) =>
    props.to === props.currentpath ? "#346c8c" : "#f0f0f0"};
  cursor: pointer;
  text-align: center;
  font-weight: 400;
  color: ${(props) => (props.to === props.currentpath ? "#ffffff" : "#333333")};
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.to === props.currentpath ? "#2a566f" : "#d9d9d9"};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BackButton = styled(Link)`
  color: #0ca8e8;
  background-color: white;
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.4rem;
`;

interface ISidebarButton {
  to: string;
  currentpath?: string;
}

interface ISidebar {
  currentpath?: string;
}

const Sidebar: React.FC<ISidebar> = ({ currentpath }) => {
  return (
    <Container>
      <CompanyIcon to="/admin">TraveloHI</CompanyIcon>
      <InnerContainer>
        <SidebarButton to="/admin/send-broadcast" currentpath={currentpath}>
          Send Broadcast
        </SidebarButton>
        <SidebarButton to="/admin/view-user" currentpath={currentpath}>
          View User
        </SidebarButton>
        <SidebarButton to="/admin/view-promo" currentpath={currentpath}>
          View Promo
        </SidebarButton>
        <SidebarButton to="/admin/view-airline" currentpath={currentpath}>
          View Airline
        </SidebarButton>
        <SidebarButton to="/admin/view-airplane" currentpath={currentpath}>
          View Airplane
        </SidebarButton>
        <SidebarButton to="/admin/view-flight" currentpath={currentpath}>
          View Flight
        </SidebarButton>
        <SidebarButton to="/admin/view-hotel" currentpath={currentpath}>
          View Hotel
        </SidebarButton>
        <SidebarButton to="/admin/view-room" currentpath={currentpath}>
          View Room
        </SidebarButton>
        <ButtonContainer>
          <BackButton to="/">Back</BackButton>
        </ButtonContainer>
      </InnerContainer>
    </Container>
  );
};

export default Sidebar;
