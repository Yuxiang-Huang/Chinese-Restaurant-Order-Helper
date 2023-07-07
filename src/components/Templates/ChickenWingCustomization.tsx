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
} from "@chakra-ui/react";
import FriedSlider from "./FriedSlider";

interface Props {
  id: string;
  foodName: string;
  lastCustomization: string[];
  isOpen: boolean;
  onClose: () => void;
  onEnter: (id: string, str: string) => void;
}

const ChickenWingCustomization = ({
  id,
  lastCustomization,
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  // parsing last customization
  let chopUpBoolean = lastCustomization[0] == "Chop up";
  let defaultText = lastCustomization
    .filter((_, index) => index > 0)
    .join(", ");
  const ref = useRef<HTMLInputElement>(null);

  const createCustomizationText = () => {
    let customization = "";
    if (chopUpBoolean) customization += "Chop up; ";
    if (ref.current) customization += ref.current.value;
    return customization;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modify Customization</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Checkbox
              defaultChecked={chopUpBoolean}
              onChange={(event) => (chopUpBoolean = event.target.checked)}
              marginBottom={10}
            >
              Chop up
            </Checkbox>
            <FriedSlider />
            <FormControl marginTop={10}>
              <Input
                ref={ref}
                placeholder="Enter customization..."
                defaultValue={defaultText}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    onEnter(id, createCustomizationText());
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
                onEnter(id, createCustomizationText());
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

export default ChickenWingCustomization;
