import styled from "@emotion/styled";
import Sidebar from "../../components/sidebar";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
`;

const Title = styled.p`
  padding: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: #0ca8e8;
`;

const AdminDashboardPage = () => {
  return (
    <Container>
      <InnerContainer>
        <Sidebar />
        <Title>Welcome to Admin dashboard!</Title>
      </InnerContainer>
    </Container>
  );
};

export default AdminDashboardPage;
