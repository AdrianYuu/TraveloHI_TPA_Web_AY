import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 1.5rem;
`;

const Bar = styled.div`
  background-color: #309cd4;
  height: 0.2rem;
`;

const HamburgerIcon = () => {
  return (
    <Container>
      <Bar />
      <Bar />
      <Bar />
    </Container>
  );
};

export default HamburgerIcon;
