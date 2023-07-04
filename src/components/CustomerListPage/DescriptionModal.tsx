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
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import RadioGroupTemplate from "../Templates/RadioGroupTemplate";
import { Customer } from "../../App";

interface Props {
  id: string;
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
  updateCustomerDescription: (
    id: string,
    description: CustomerDescription
  ) => void;
}

export interface CustomerDescription {
  Called: boolean;
  Present: boolean;
  Age: string;
  Ethnity: string;
  Sex: string;
  Accessory: string;
  AdditionalText: string;
}

const DescriptionModal = ({
  id,
  customer,
  isOpen,
  onClose,
  updateCustomerDescription,
}: Props) => {
  const customerDescription: CustomerDescription = {
    Called: customer.description.Called,
    Present: customer.description.Present,
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
  };

  const setCustomerDescriptionHelper = (type: string, newData: string) => {
    switch (type) {
      case "Age":
        customerDescription.Age = newData;
        break;
      case "Ethnity":
        customerDescription.Ethnity = newData;
        break;
      case "Sex":
        customerDescription.Sex = newData;
        break;
    }
  };

  const getInitValue = (type: string) => {
    switch (type) {
      case "Age":
        return customerDescription.Age;
      case "Ethnity":
        return customerDescription.Ethnity;
      case "Sex":
        return customerDescription.Sex;
    }
    return "";
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customer Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"xl"}>Presence</Text>
            <HStack marginBottom={5} spacing={5}>
              <Checkbox
                defaultChecked={customerDescription.Called}
                onChange={(event) => {
                  customerDescription.Called = event.target.checked;
                  updateCustomerDescription(customer.id, customerDescription);
                }}
              >
                Called?
              </Checkbox>
              <Checkbox
                defaultChecked={customerDescription.Present}
                onChange={(event) => {
                  customerDescription.Present = event.target.checked;
                  updateCustomerDescription(customer.id, customerDescription);
                }}
              >
                Present?
              </Checkbox>
            </HStack>

            {(!customerDescription.Called || customerDescription.Present) && (
              <>
                <List spacing={5}>
                  {Object.keys(radioGroups).map((type) => (
                    <RadioGroupTemplate
                      header={type}
                      options={radioGroups[type]}
                      initValue={getInitValue(type)}
                      setValue={setCustomerDescriptionHelper}
                      key={type}
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
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                if (ref.current)
                  customerDescription.AdditionalText = ref.current.value;
                updateCustomerDescription(id, customerDescription);
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

export default DescriptionModal;
