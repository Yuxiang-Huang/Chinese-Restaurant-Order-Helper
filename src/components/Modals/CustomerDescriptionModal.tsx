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

interface Props {
  id: string;
  defaultText?: string;
  header: string;
  placeholder: string;
  isOpen: boolean;
  onClose: () => void;
  onEnter: (id: string, str: string) => void;
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

  return (
    <>
      <Modal initialFocusRef={ref} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Checkbox>Checkbox</Checkbox>
          </ModalBody>

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
