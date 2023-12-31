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
  useDisclosure,
  Collapse,
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

  const {
    isOpen: fullDisplayState,
    onOpen: fullDisplay,
    onClose: partialDisplay,
  } = useDisclosure({
    defaultIsOpen: !description.Called || description.Present,
  });

  const ref = useRef<HTMLInputElement>(null);

  const radioGroups: { [key: string]: string[] } = {
    Age: ["Teen", "18-35", "35-60", "60+"],
    Ethnity: ["Black", "Brown", "Hispanic", "White"],
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

  // collapse when called and not present
  const setFullDisplayState = (called: boolean, present: boolean) => {
    if (!called || present) {
      fullDisplay();
    } else {
      partialDisplay();
    }
  };

  // called when save button is pressed
  const save = () => {
    if (ref.current) {
      setDescription({
        ...description,
        AdditionalText: ref.current.value,
      });
      updateCustomerDescription(id, {
        ...description,
        AdditionalText: ref.current.value,
      });
    }

    onClose();
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
                  setFullDisplayState(
                    event.target.checked,
                    description.Present
                  );
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
                  setFullDisplayState(description.Called, event.target.checked);
                }}
              >
                Present?
              </Checkbox>
            </HStack>

            <Collapse in={fullDisplayState} animateOpacity>
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
            </Collapse>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => save()}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DescriptionModal;
