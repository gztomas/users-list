import styled from "@emotion/styled";
import * as React from "react";
import { useUsersList } from "../domain/useUsersList";
import { EditIcon } from "./icons/EditIcon";
import { Avatar } from "./system/Avatar";
import { Button } from "./system/Button";
import { Card, CardContent, CardSubtitle, CardTitle } from "./system/Card";
import { Input } from "./system/Input";
import { UserEditor } from "./UserEditor";

export const UsersList = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selected, setSelected] = React.useState<{
    id: string;
    name: string;
    address: string | null;
    description: string | null;
  } | null>(null);
  const { users, loadMore } = useUsersList(searchTerm);

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
            <UserCard key={user?.id} onClick={() => setSelected(user)}>
              <CardIcon />
              <Avatar
                src={`https://source.unsplash.com/126x126/?portrait,${user?.id ??
                  ""}`}
              />
              <CardContent>
                <CardTitle>{user?.name}</CardTitle>
                <CardSubtitle>{user?.description}</CardSubtitle>
              </CardContent>
            </UserCard>
          ))}
      </Grid>
      <Button onClick={loadMore}>Load more</Button>
      {selected && (
        <UserEditor
          key={selected.id}
          user={selected}
          onClose={() => setSelected(null)}
        />
      )}
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

const CardIcon = styled(EditIcon)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const UserCard = styled(Card)`
  position: relative;
  :hover,
  :focus {
    svg {
      opacity: 1;
    }
  }
`;
