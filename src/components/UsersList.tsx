import styled from "@emotion/styled";
import mapboxgl from "mapbox-gl";
import * as React from "react";
import { useUsers } from "../domain/useUsers";
import { Avatar } from "./system/Avatar";
import { Button } from "./system/Button";
import { Card, CardContent, CardSubtitle, CardTitle } from "./system/Card";
import { Input } from "./system/Input";
import { Label } from "./system/Label";
import { Modal, ModalBackdrop, ModalFooter } from "./system/Modal";

export const UsersList = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selected, setSelected] = React.useState<{
    id: string;
    name: string;
    address: string | null;
    description: string | null;
  } | null>(null);
  const { users, loadMore } = useUsers(searchTerm);
  const showModal = Boolean(selected);
  const mapboxContainer = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = mapboxContainer.current;
    if (element && !element.children.length) {
      const container = document.createElement("div");
      const { style } = container;
      style.position = "absolute";
      style.top = style.right = style.bottom = style.left = "0";
      element.appendChild(container);
      new mapboxgl.Map({
        accessToken:
          "pk.eyJ1IjoiZ3p0b21hcyIsImEiOiJja2h6OGZuczkwaXNzMnNsMmw3dnk5bmxzIn0.QO9AD8ynVhAuNnjCKGLzVw",
        container,
        style: "mapbox://styles/gztomas/cki0qq81t40f619n23yfhor92",
      });
    }
  });

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
      {showModal && (
        <Modal>
          <h1>Edit user</h1>
          <ModalContent>
            <Map ref={mapboxContainer} />
            <Form>
              <Label>
                Name <Input value={selected?.name} />
              </Label>
              <Label>
                Address <Input value={selected?.address ?? ""} />
              </Label>
              <Label>
                Description <Input value={selected?.description ?? ""} />
              </Label>
            </Form>
          </ModalContent>
          <ModalFooter>
            <Button>Save</Button>
            <Button onClick={() => setSelected(null)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 38.84375rem;

  & > label + label {
    margin-top: 2.25rem;
  }
`;

const Map = styled.div`
  border-radius: 8px;
  background-color: lightblue;
  flex: 1;
  overflow: hidden;
  position: relative;

  canvas {
    outline: none;
  }
`;

const ModalContent = styled.div`
  display: flex;
  margin: 5rem 0;

  & > * + * {
    margin-left: 2.25rem;
  }
`;

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
