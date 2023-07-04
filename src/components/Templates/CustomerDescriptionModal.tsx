import { useRef, useState } from "react";
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
  FormControl,
  Input,
  Text,
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
  const ref = useRef<HTMLInputElement>(null);

  const radioGroups: { [key: string]: string[] } = {
    Age: ["Teen", "18-35", "35-60", "60+"],
    Ethnity: ["Black", "Hispanic", "White", "Asian"],
    Sex: ["Male", "Female", "?"],
    Accessory: ["Glasses", "Hat", "N/A"],
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
            <Text fontSize={"xl"} marginTop={5}>
              Additional Description
            </Text>
            <FormControl>
              <Input
                ref={ref}
                placeholder={"Enter additional description..."}
                defaultValue={customerDescription.additionalText}
              />
            </FormControl>
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
