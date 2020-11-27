import styled from "@emotion/styled";
import * as React from "react";
import { useUsers } from "../domain/useUsers";
import { Avatar } from "./system/Avatar";
import { Button } from "./system/Button";
import { Card, CardContent, CardSubtitle, CardTitle } from "./system/Card";
import { Input } from "./system/Input";
import { Modal, ModalBackdrop } from "./system/Modal";

export const UsersList = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selected, setSelected] = React.useState<{ id: string } | null>(null);
  const { users, loadMore } = useUsers(searchTerm);
  const showModal = Boolean(selected);
  return (
    <>
      <Header>
        <h1>Users list</h1>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>
      <Grid>
        {users?.items
          ?.filter((user) => user?.name.includes(searchTerm))
          .map((user) => (
            <Card key={user?.id} onClick={() => setSelected(user)}>
              <Avatar />
              <CardContent>
                <CardTitle>{user?.name}</CardTitle>
                <CardSubtitle>{user?.description}</CardSubtitle>
              </CardContent>
            </Card>
          ))}
      </Grid>
      <Button onClick={loadMore}>Load more</Button>
      {showModal && <ModalBackdrop onClick={() => setSelected(null)} />}
      {showModal && <Modal />}
    </>
  );
};

const Header = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const Grid = styled.div`
  align-self: stretch;
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(3, 1fr);
  margin: 5rem 0;
`;
