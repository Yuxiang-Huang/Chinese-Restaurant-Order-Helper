import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  deleteCustomer: () => void;
}

const TopBar = ({ deleteCustomer }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <HStack justifyContent={"space-between"}>
      <Link to="/CustomerList">
        <Button colorScheme="blue" margin={3}>
          View All Customers
        </Button>
      </Link>
      <Button colorScheme="red" margin={3} onClick={onOpen}>
        Clear
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  deleteCustomer();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </HStack>
  );
};

export default TopBar;
