import { useNavigate } from "react-router-dom";
import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import AlertDialogTemplate from "../../Templates/AlertDialogTemplate";
import { Customer, resetCurCustomer } from "../../../App";

interface Props {
  customer: Customer;
  setCurCustomer: (newCustomer: Customer) => void;
  deleteCustomer: () => void;
}

const TopBar = ({ customer, setCurCustomer, deleteCustomer }: Props) => {
  const navigate = useNavigate();

  const {
    isOpen: clearIsOpen,
    onOpen: clearOnOpen,
    onClose: clearOnClose,
  } = useDisclosure();

  const {
    isOpen: leaveIsOpen,
    onOpen: leaveOnOpen,
    onClose: leaveOnClose,
  } = useDisclosure();

  const leavePage = () => {
    setCurCustomer(resetCurCustomer());
    navigate("/CustomerList");
  };

  return (
    <HStack justifyContent={"space-between"}>
      <Button
        colorScheme="blue"
        margin={3}
        onClick={() => {
          if (
            customer.orderList.length === 0 &&
            Object.keys(customer.description).length === 0
          )
            leavePage();
          else leaveOnOpen();
        }}
      >
        View All Customers
      </Button>
      <AlertDialogTemplate
        header="Leave Page"
        enterText="Leave"
        isOpen={leaveIsOpen}
        onClose={leaveOnClose}
        onEnter={leavePage}
      />
      <Button colorScheme="red" margin={3} onClick={clearOnOpen}>
        Clear
      </Button>
      <AlertDialogTemplate
        header="Delete Customer"
        enterText="Delete"
        isOpen={clearIsOpen}
        onClose={clearOnClose}
        onEnter={deleteCustomer}
      />
    </HStack>
  );
};

export default TopBar;
