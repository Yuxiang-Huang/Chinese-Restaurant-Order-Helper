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
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import DeseletableRadioGroup from "../Templates/DeseletableRadioGroup";
import { Customer } from "../../App";
import Accessory from "./Accessory";

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
  Accessory: boolean[];
  AdditionalText: string;
}

const DescriptionModal = ({
  id,
  customer,
  isOpen,
  onClose,
  updateCustomerDescription,
}: Props) => {
  const resetDescription = () => {
    return {
      Called: customer.description.Called,
      Present: customer.description.Present,
      Age: customer.description.Age,
      Ethnity: customer.description.Ethnity,
      Sex: customer.description.Sex,
      Accessory: customer.description.Accessory,
      AdditionalText: customer.description.AdditionalText,
    };
  };

  const [description, setDescription] = useState(resetDescription);

  const ref = useRef<HTMLInputElement>(null);

  const radioGroups: { [key: string]: string[] } = {
    Age: ["Teen", "18-35", "35-60", "60+"],
    Ethnity: ["Black", "Hispanic", "White", "Asian"],
    Sex: ["Male", "Female", "?"],
  };

  const setCustomerDescriptionHelper = (type: string, newData: string) => {
    switch (type) {
      case "Age":
        setDescription({ ...description, Age: newData });
        break;
      case "Ethnity":
        setDescription({ ...description, Ethnity: newData });
        break;
      case "Sex":
        setDescription({ ...description, Sex: newData });
        break;
    }
  };

  const getInitValue = (type: string) => {
    switch (type) {
      case "Age":
        return description.Age;
      case "Ethnity":
        return description.Ethnity;
      case "Sex":
        return description.Sex;
    }
    return "";
  };

  const setAccessory = (newAccessory: boolean[]) => {
    setDescription({ ...description, Accessory: newAccessory });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customer Description</ModalHeader>
          <ModalCloseButton onClick={() => setDescription(resetDescription)} />
          <ModalBody>
            <Text fontSize={"xl"}>Presence</Text>
            <HStack marginBottom={5} spacing={5}>
              <Checkbox
                defaultChecked={description.Called}
                onChange={(event) => {
                  setDescription({
                    ...description,
                    Called: event.target.checked,
                  });
                }}
              >
                Called?
              </Checkbox>
              <Checkbox
                defaultChecked={description.Present}
                onChange={(event) => {
                  setDescription({
                    ...description,
                    Present: event.target.checked,
                  });
                }}
              >
                Present?
              </Checkbox>
            </HStack>

            {(!description.Called || description.Present) && (
              <>
                <List spacing={5}>
                  {Object.keys(radioGroups).map((type) => (
                    <DeseletableRadioGroup
                      header={type}
                      options={radioGroups[type]}
                      initValue={getInitValue(type)}
                      setValue={setCustomerDescriptionHelper}
                      key={type}
                    />
                  ))}
                </List>

                <Accessory
                  accessoryState={description.Accessory}
                  setAccessory={setAccessory}
                />

                <Text fontSize={"xl"} marginTop={5}>
                  Additional Description
                </Text>
                <FormControl>
                  <Input
                    ref={ref}
                    placeholder={"Enter additional description..."}
                    defaultValue={description.AdditionalText}
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
                  setDescription({
                    ...description,
                    AdditionalText: ref.current.value,
                  });
                updateCustomerDescription(id, description);
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
