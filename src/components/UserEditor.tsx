import { gql, useMutation } from "@apollo/client";
import * as React from "react";
import { UpdateUserMutation, UpdateUserMutationVariables } from "../API";
import { updateUser } from "../graphql/mutations";
import { Mapbox, useMapbox } from "./Mapbox";
import { Button } from "./system/Button";
import { Form } from "./system/Form";
import { Input } from "./system/Input";
import { Label } from "./system/Label";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  useModalShortcuts,
} from "./system/Modal";

type UserEdit = {
  id: string;
  name: string;
  address: string | null;
  description: string | null;
};

type EditableField = keyof Omit<UserEdit, "id">;

export const UserEditor = ({
  user,
  onClose,
}: {
  user: UserEdit;
  onClose: () => void;
}) => {
  const [userEdit, setUserEdit] = React.useState(user);
  const [pristine, setPristine] = React.useState(true);
  const { name, address, description } = userEdit;
  const mapboxRef = useMapbox(address);
  const [update, { loading, error }] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(gql(updateUser));
  useModalShortcuts({ onClose });

  const createChangeHandler = (field: EditableField) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPristine(false);
    setUserEdit({ ...userEdit, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await update({
      variables: { input: { id: user.id, name, address, description } },
    });
    onClose();
  };

  return (
    <Modal>
      <ModalBackdrop onClick={onClose} />
      <ModalContent>
        <h1>Edit user</h1>
        <ModalBody>
          <Mapbox ref={mapboxRef} />
          <Form id="user-editor-form" onSubmit={handleSubmit}>
            <Label>
              Name
              <Input
                autoFocus
                disabled={loading}
                onChange={createChangeHandler("name")}
                placeholder="John Doe"
                required
                value={name}
              />
            </Label>
            <Label>
              Address
              <Input
                disabled={loading}
                onChange={createChangeHandler("address")}
                placeholder="Street, city, country"
                value={address ?? ""}
              />
            </Label>
            <Label>
              Description
              <Input
                disabled={loading}
                onChange={createChangeHandler("description")}
                placeholder="Interests, roles, facts"
                value={description ?? ""}
              />
            </Label>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            form="user-editor-form"
            disabled={pristine || loading}
            $error={Boolean(error)}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button onClick={onClose} $variant="secondary" disabled={loading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
