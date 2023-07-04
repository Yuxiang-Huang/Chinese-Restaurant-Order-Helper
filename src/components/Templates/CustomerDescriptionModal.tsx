import { useRef } from "react";
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

interface Props {
  id: string;
  customer: Customer;
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
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  const customerDescription: { [key: string]: string } = {
    Age: customer.description.Age,
    Ethnity: customer.description.Ethnity,
    Sex: customer.description.Sex,
    Accessory: customer.description.Accessory,
    AdditionalText: customer.description.AdditionalText,
  };
  const ref = useRef<HTMLInputElement>(null);

  const radioGroups: { [key: string]: string[] } = {
    Age: ["Teen", "18-35", "35-60", "60+"],
    Ethnity: ["Black", "Hispanic", "White", "Asian"],
    Sex: ["Male", "Female", "?"],
    Accessory: ["Glasses", "Hat", "N/A"],
  };

  const setCustomerDescriptionHelper = (type: string, newData: string) => {
    customerDescription[type] = newData;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customer Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={5}>
              {Object.keys(radioGroups).map((rgHeader) => (
                <RadioGroupTemplate
                  header={rgHeader}
                  options={radioGroups[rgHeader]}
                  initValue={customerDescription[rgHeader]}
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
                defaultValue={customerDescription.AdditionalText}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                if (ref.current)
                  customerDescription.AdditionalText = ref.current.value;
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
