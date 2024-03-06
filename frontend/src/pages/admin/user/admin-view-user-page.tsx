import styled from "@emotion/styled";
import Sidebar from "../../../components/sidebar";
import CrossPerson from "../../../assets/Cross_Person.png";
import CheckPerson from "../../../assets/Check_Person.png";
import Cross from "../../../assets/Cross_Icon.png";
import { useEffect, useState } from "react";
import { IUser } from "../../../interfaces/user-interface";
import { banUser, getUsers, unBanUser } from "../../../api/api-user";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
`;

const TableContainer = styled.div`
  width: 100%;
  padding: 0.5rem 2rem;
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
  vertical-align: middle;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: white;
`;

const TableTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: #0ca8e8;
  margin-top: 1.5rem;
  margin-bottom: 1.3rem;
`;

const AdminViewUserPage = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setUsers(await getUsers());
  };

  const handleBan = async (UserID: any) => {
    await banUser(UserID);
    fetchData();
  };

  const handleUnBan = async (UserID: any) => {
    await unBanUser(UserID);
    fetchData();
  };

  return (
    <Container>
      <InnerContainer>
        <Sidebar currentpath="/admin/view-user" />
        <TableContainer>
          <TableTitle>User List</TableTitle>
          <Table>
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th>Date Of Birth</Th>
                <Th>Gender</Th>
                <Th>Status</Th>
                <Th>Ban</Th>
                <Th>Unban</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((user, index) => (
                <Tr key={user.ID}>
                  <Td>{index + 1}.</Td>
                  <Td>{`${user.FirstName} ${user.LastName}`}</Td>
                  <Td>{user.Email}</Td>
                  <Td>{user.DateOfBirth}</Td>
                  <Td>{user.Gender}</Td>
                  <Td>{user.IsBanned ? "Banned" : "Not Banned"}</Td>
                  <Td>
                    {!user.IsBanned ? (
                      <Button onClick={() => handleBan(user.ID)}>
                        <Icon src={CrossPerson} />
                      </Button>
                    ) : (
                      <Icon src={Cross} />
                    )}
                  </Td>
                  <Td>
                    {user.IsBanned ? (
                      <Button onClick={() => handleUnBan(user.ID)}>
                        <Icon src={CheckPerson} />
                      </Button>
                    ) : (
                      <Icon src={Cross} />
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </InnerContainer>
    </Container>
  );
};

export default AdminViewUserPage;
