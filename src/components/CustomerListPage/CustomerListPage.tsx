import { Button, HStack, Text, Switch } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Customer, calculateTotalPrice } from "../../App";
import { useState } from "react";
import CustomerListDisplay from "./CustomerDisplay";

interface Props {
  customerList: Customer[];
  archivedCustomerList: Customer[];
}

const CustomerListPage = ({ customerList, archivedCustomerList }: Props) => {
  const [archivedMode, setArchivedMode] = useState(false);

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Link to="/">
          <Button colorScheme="red" margin={3}>
            <AiOutlinePlus />
          </Button>
        </Link>
        {archivedMode && (
          <Text background={"yellow"} fontSize="2xl">
            <b>
              {"$" + calculateTotalRevenue(customerList, archivedCustomerList)}
            </b>
          </Text>
        )}
        <HStack>
          <Switch
            colorScheme="green"
            isChecked={archivedMode}
            onChange={(event) => setArchivedMode(event.target.checked)}
          />
          <Text whiteSpace="nowrap" marginRight={3}>
            Show Archive
          </Text>
        </HStack>
      </HStack>
      <CustomerListDisplay customerList={customerList} archived={false} />
      {archivedMode && (
        <CustomerListDisplay
          customerList={archivedCustomerList}
          archived={true}
        />
      )}
    </>
  );
};

const calculateTotalRevenue = (
  customerList: Customer[],
  archivedCustomerList: Customer[]
) => {
  let total = 0;
  customerList.map(
    (customer) => (total += parseFloat(calculateTotalPrice(customer.orderList)))
  );
  archivedCustomerList.map(
    (customer) => (total += parseFloat(calculateTotalPrice(customer.orderList)))
  );
  return Number(total).toFixed(2);
};

export default CustomerListPage;
