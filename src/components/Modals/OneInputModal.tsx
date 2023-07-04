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

const OneInputModal = ({
  id,
  defaultText,
  header,
  placeholder,
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
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={ref}
                placeholder={placeholder}
                defaultValue={defaultText}
                onKeyDown={handleKeyPress}
              />
            </FormControl>
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

export default OneInputModal;
