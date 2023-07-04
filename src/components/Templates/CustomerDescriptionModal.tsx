import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import RadioGroupTemplate from "./RadioGroupTemplate";
import { Customer } from "../../App";
import { produce } from "immer";

interface Props {
  id: string;
  customer: Customer;
  header: string;
  isOpen: boolean;
  onClose: () => void;
  onEnter: (id: string, description: CustomerDescription) => void;
}

export interface CustomerDescription {
  age: string;
  ethnity: string;
  sex: string;
  accessory: string;
  additionalText: string;
}

const CustomerDescriptionModal = ({
  id,
  customer,
  header,
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  const [customerDescription, setCustomerDescription] =
    useState<CustomerDescription>(customer.description);

  const setAge = (newAge: string) => {
    setCustomerDescription(produce((draft) => (draft.age = newAge)));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <RadioGroupTemplate
            header="Age"
            options={["Teen", "18-26"]}
            value={customerDescription.age}
            setValue={setAge}
          />
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onEnter(id, customerDescription);
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomerDescriptionModal;
