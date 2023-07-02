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
  header: string;
  placeholder: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalTemplate = ({ header, placeholder, isOpen, onClose }: Props) => {
  const priceRef = useRef(null);

  return (
    <>
      <Modal initialFocusRef={priceRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input ref={priceRef} placeholder={placeholder} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Enter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalTemplate;
