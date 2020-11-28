import * as React from "react";
import { Mapbox, useMapbox } from "./Mapbox";
import { Button } from "./system/Button";
import { Form } from "./system/Form";
import { Input } from "./system/Input";
import { Label } from "./system/Label";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalFooter,
} from "./system/Modal";

type UserEdit = {
  id: string;
  name: string;
  address: string | null;
  description: string | null;
};

export const UserEditor = ({
  user,
  onSave,
  onClose,
}: {
  user: UserEdit;
  onSave: (value: UserEdit) => void;
  onClose: () => void;
}) => {
  const [userEdit, setUserEdit] = React.useState(user);
  const { name, address, description } = userEdit;
  const mapboxRef = useMapbox(address);

  const createChangeHandler = (field: keyof Omit<UserEdit, "id">) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserEdit({ ...userEdit, [field]: e.target.value });
  };

  const handleSave = () => {
    onSave(userEdit);
  };

  return (
    <>
      <ModalBackdrop onClick={onClose} />
      <Modal>
        <h1>Edit user</h1>
        <ModalContent>
          <Mapbox ref={mapboxRef} />
          <Form>
            <Label>
              Name
              <Input value={name} onChange={createChangeHandler("name")} />
            </Label>
            <Label>
              Address
              <Input
                value={address ?? ""}
                onChange={createChangeHandler("address")}
              />
            </Label>
            <Label>
              Description
              <Input
                value={description ?? ""}
                onChange={createChangeHandler("description")}
              />
            </Label>
          </Form>
        </ModalContent>
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
