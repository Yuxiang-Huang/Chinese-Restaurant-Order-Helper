import { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Button,
  Input,
  Checkbox,
  useNumberInput,
  HStack,
  Flex,
} from "@chakra-ui/react";

interface Props {
  id: string;
  lastCustomization: string[];
  isOpen: boolean;
  onClose: () => void;
  onEnter: (id: string, priceDif: number, str: string) => void;
}

const RiceCustomization = ({
  id,
  lastCustomization,
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  // parsing last customization
  let index = 0;

  // sauce on rice
  let sauceBoolean = false;
  if (lastCustomization[index] == "Sauce on Rice") {
    sauceBoolean = true;
    index++;
  }

  // egg
  let eggBoolean = false;
  if (lastCustomization[index] == "Egg") {
    eggBoolean = true;
    index++;
  }

  // default text
  let defaultText = lastCustomization.filter((_, i) => i >= index).join(", ");
  const ref = useRef<HTMLInputElement>(null);

  const createCustomizationText = () => {
    let customization = "";
    if (sauceBoolean) customization += "Sauce on Rice; ";
    if (eggBoolean) customization += "Egg; ";
    if (ref.current) customization += ref.current.value;
    return customization;
  };

  const save = () => {
    onEnter(id, 0, createCustomizationText());
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modify Customization</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack marginBottom={5} spacing={5}>
              <Checkbox
                defaultChecked={sauceBoolean}
                onChange={(event) => (sauceBoolean = event.target.checked)}
              >
                Sauce on Rice
              </Checkbox>
              <Checkbox
                defaultChecked={eggBoolean}
                onChange={(event) => (eggBoolean = event.target.checked)}
              >
                Egg
              </Checkbox>
            </HStack>
            <FormControl>
              <Input
                ref={ref}
                placeholder="Enter additional customization..."
                defaultValue={defaultText}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    save();
                    onClose();
                  }
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                save();
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

export default RiceCustomization;
