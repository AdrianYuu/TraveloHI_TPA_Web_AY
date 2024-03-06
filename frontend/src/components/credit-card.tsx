import React from "react";
import styled from "@emotion/styled";

interface CreditCardProps {
  cardNumber: string;
  bankName: string;
  CVV: string;
  expiryDate: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d4059;
  color: white;
  height: 14rem;
  border-radius: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  height: 80%;
`;

const CardNumber = styled.div`
  font-size: 3rem;
`;

const BankName = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const CVVExpiryContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CVVText = styled.div`
  font-size: 14px;
`;

const ExpiryDate = styled.div`
  font-size: 14px;
`;

const CreditCard: React.FC<CreditCardProps> = ({
  cardNumber,
  bankName,
  CVV,
  expiryDate,
}) => {
  return (
    <Container>
      <CardContainer>
        <BankName>{bankName}</BankName>
        <CardNumber>{cardNumber}</CardNumber>
        <CVVExpiryContainer>
          <CVVText>CVV: {CVV}</CVVText>
          <ExpiryDate>Expiry: {expiryDate}</ExpiryDate>
        </CVVExpiryContainer>
      </CardContainer>
    </Container>
  );
};

export default CreditCard;
