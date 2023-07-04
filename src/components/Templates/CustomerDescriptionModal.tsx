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
  List,
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
  [key: string]: string;
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

  const radioGroups: { [key: string]: string[] } = {
    Age: ["Teen", "18-30", "30-60", "60+"],
    Ethnity: ["Black", "Hispanic"],
    Sex: ["Male", "Female", "?"],
  };

  const setCustomerDescriptionHelper = (type: string, newData: string) => {
    setCustomerDescription(
      produce((draft) => {
        draft[type] = newData;
      })
    );
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={5}>
              {Object.keys(radioGroups).map((rgHeader) => (
                <RadioGroupTemplate
                  header={rgHeader}
                  options={radioGroups[rgHeader]}
                  value={customerDescription[rgHeader]}
                  setValue={setCustomerDescriptionHelper}
                  key={rgHeader}
                />
              ))}
            </List>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
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
