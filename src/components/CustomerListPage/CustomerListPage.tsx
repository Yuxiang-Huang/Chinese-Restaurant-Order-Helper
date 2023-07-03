import { Button, HStack, Text, Switch } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Customer } from "../../App";
import { useState } from "react";
import CustomerListDisplay from "./CustomerDisplay";

interface Props {
  orderList: Customer[];
  archivedCustomerList: Customer[];
}

const CustomerListPage = ({ orderList, archivedCustomerList }: Props) => {
  const [archivedMode, setArchivedMode] = useState(false);

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Link to="/">
          <Button colorScheme="red" margin={3}>
            <AiOutlinePlus />
          </Button>
        </Link>
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
      <CustomerListDisplay orderList={orderList} archived={false} />
      {archivedMode && (
        <CustomerListDisplay orderList={archivedCustomerList} archived={true} />
      )}
    </>
  );
};

export default CustomerListPage;
