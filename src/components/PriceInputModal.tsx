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
  useDisclosure,
} from "@chakra-ui/react";

const PriceInputModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const priceRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal initialFocusRef={priceRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Unknown Price</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input ref={priceRef} placeholder="Enter price of food..." />
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

export default PriceInputModal;
