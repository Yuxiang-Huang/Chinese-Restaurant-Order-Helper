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
} from "@chakra-ui/react";
import RadioGroupTemplate from "./RadioGroupTemplate";

interface Props {
  id: string;
  defaultText?: string;
  header: string;
  placeholder: string;
  isOpen: boolean;
  onClose: () => void;
  onEnter: (id: string, str: string) => void;
}

interface CustomerDescription {
  age: string;
  ethnity: string;
  sex: string;
  accessory: string;
  additionalText: string;
}

const CustomerDescriptionModal = ({
  id,
  defaultText,
  header,
  placeholder,
  isOpen,
  onClose,
  onEnter,
}: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("1");

  return (
    <>
      <Modal initialFocusRef={ref} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <RadioGroupTemplate
            header="Age"
            options={["Teen", "18-26"]}
            value={value}
            setValue={setValue}
          />
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
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

export default CustomerDescriptionModal;
