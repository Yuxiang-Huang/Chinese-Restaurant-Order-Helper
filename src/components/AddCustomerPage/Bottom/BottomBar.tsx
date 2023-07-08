import { Button, HStack, Text } from "@chakra-ui/react";
import { Customer, calculateTotalPrice } from "../../../App";

interface Props {
  customer: Customer;
  editMode: boolean;
  addToCustomerList: (customer: Customer) => void;
  updateCustomerList: (customer: Customer) => void;
}

const BottomBar = ({
  customer,
  editMode,
  addToCustomerList,
  updateCustomerList,
}: Props) => {
  return (
    <HStack justifyContent={"space-between"}>
      <Button
        colorScheme="green"
        margin={3}
        marginTop={10}
        onClick={() =>
          editMode ? updateCustomerList(customer) : addToCustomerList(customer)
        }
      >
        {editMode ? "Save" : "Add to Customer List"}
      </Button>
      <Text margin={3} background={"yellow"} fontSize="xl">
        {"Total: $" + calculateTotalPrice(customer.orderList)}
      </Text>
    </HStack>
  );
};

export default BottomBar;
