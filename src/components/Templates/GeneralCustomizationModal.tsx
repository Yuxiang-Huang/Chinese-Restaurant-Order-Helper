import { useRef, useState } from "react";
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
} from "@chakra-ui/react";
import FriedSlider from "./FriedSlider";

interface Props {
  id: string;
  foodName: string;
  defaultText?: string;
  isOpen: boolean;
  onClose: () => void;
  onEnter: (id: string, str: string) => void;
}

const GeneralCustomizationModal = ({
  id,
  foodName,
  defaultText,
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  // also submit when user press enter
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter(id, ref.current === null ? "" : ref.current.value);
      onClose();
    }
  };

  return (
    <>
      <Modal initialFocusRef={ref} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modify Customization</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FriedSlider />
            <FormControl marginTop={6}>
              <Input
                ref={ref}
                placeholder="Enter customization..."
                defaultValue={defaultText}
                onKeyDown={handleKeyPress}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                onEnter(id, ref.current === null ? "" : ref.current.value);
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

export default GeneralCustomizationModal;
