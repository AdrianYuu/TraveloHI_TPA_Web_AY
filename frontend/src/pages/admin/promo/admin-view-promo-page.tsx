import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPromo } from "../../../interfaces/promo-interface";
import { getPromos } from "../../../api/api-promo";
import EditIcon from "../../../assets/Edit_Icon.png";
import useLanguage from "../../../contexts/language-context";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  min-height: 100%;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;
  border: 1px solid #dcdcdc;
`;

const Thead = styled.thead`
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

const Tbody = styled.tbody`
  text-align: center;
`;

const Tr = styled.tr`
  th {
    background-color: #0ca8e8;
  }

  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }
`;

const Th = styled.th`
  padding: 1rem;
`;

const Td = styled.td`
  padding: 1rem;
  vertical-align: top;
`;

const AddButton = styled(Link)`
  background-color: white;
  border: 1px solid #0ca8e8;
  border-radius: 0.5rem;
  color: #0ca8e8;
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #0ca8e8;
    color: white;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const PromoPicture = styled.img`
  width: 8rem;
  height: 8rem;
`;

const ActionLink = styled(Link)``;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const TableTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: #0ca8e8;
  margin-bottom: 1.3rem;
`;

const AdminViewPromoPage = () => {
  const [promos, setPromos] = useState<IPromo[] | null>(null);
  const { formatNumber } = useLanguage();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setPromos(await getPromos());
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-promo" />
        <Wrapper>
          <TableContainer>
            <TableTitle>Promo List</TableTitle>
            <ButtonContainer>
              <AddButton to="/admin/create-promo">Create Promo</AddButton>
            </ButtonContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Promo Code</Th>
                  <Th>Description</Th>
                  <Th>Promo Type</Th>
                  <Th>Discount Amount</Th>
                  <Th>Start Date</Th>
                  <Th>Finish Date</Th>
                  <Th>Promo Picture</Th>
                  <Th>Edit</Th>
                </Tr>
              </Thead>
              <Tbody>
                {promos?.map((promo, index) => (
                  <Tr key={promo.ID}>
                    <Td>{index + 1}.</Td>
                    <Td>{promo.PromoCode}</Td>
                    <Td>{promo.PromoDescription}</Td>
                    <Td>{promo.PromoType}</Td>
                    <Td>{formatNumber(promo.PromoDiscount)}</Td>
                    <Td>{promo.StartDate}</Td>
                    <Td>{promo.FinishDate}</Td>
                    <Td>
                      <PromoPicture src={promo.PromoPictureURL} />
                    </Td>
                    <Td>
                      <ActionLink to={`/admin/update-promo/${promo.ID}`}>
                        <Icon src={EditIcon} />
                      </ActionLink>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Wrapper>
      </InnerContainer>
    </Container>
  );
};

export default AdminViewPromoPage;
