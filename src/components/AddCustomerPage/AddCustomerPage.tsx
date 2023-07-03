import { Link } from "react-router-dom";
import nextId from "react-id-generator";

import { List, ListItem, Button, HStack, Text } from "@chakra-ui/react";
import { produce } from "immer";

import { Customer, calculateTotalPrice } from "../../App";
import SearchBar from "./SearchBar";
import OrderDisplay from "./OrderDisplay";

interface Props {
  customer: Customer;
  fullFoodList: string[];
  priceDict: { [key: string]: number };
  setCurCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  addToCustomerList: (customer: Customer) => void;
}

const AddCustomerPage = ({
  customer,
  fullFoodList,
  priceDict,
  setCurCustomer,
  addToCustomerList,
}: Props) => {
  //#region Customer

  // add an order to customer (called when a food button is clicked)
  const addToCustomer = (foodName: string) => {
    const p = priceDict[foodName];
    setCurCustomer(
      produce((draft) => {
        draft.orderList.push({ id: nextId(), name: foodName, price: p });
      })
    );
  };

  // delete an order from the order list of an customer
  const deleteFromCustomer = (id: string) => {
    setCurCustomer(
      produce((draft) => {
        draft.orderList = draft.orderList.filter((order) => order.id !== id);
      })
    );
  };

  // modify the price of an order from the order list of an customer
  const modifyPrice = (id: string, newPrice: number) => {
    setCurCustomer(
      produce((draft) => {
        const orderToChange = draft.orderList.find((order) => order.id === id);
        if (orderToChange) orderToChange.price = newPrice;
      })
    );
  };

  // modify the customization of an order from the order list of an customer
  const modifyCustomization = (
    id: string,
    newCustomization: string,
    main: boolean
  ) => {
    setCurCustomer(
      produce((draft) => {
        const orderToChange = draft.orderList.find((order) => order.id === id);
        if (orderToChange) {
          // main or side depending on the boolean
          if (main) {
            orderToChange.mainCustomization = newCustomization;
          } else {
            orderToChange.sideCustomization = newCustomization;
          }
        }
      })
    );
  };

  //#endregion

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Link to="/CustomerList">
          <Button colorScheme="blue" margin={3}>
            View All Customers
          </Button>
        </Link>
        <Link to="/Menu">
          <Button colorScheme="orange" margin={3}>
            View Menu
          </Button>
        </Link>
      </HStack>

      <SearchBar fullFoodList={fullFoodList} addToCustomer={addToCustomer} />

      <List>
        {customer.orderList.map((order, index) => (
          <ListItem key={index}>
            <OrderDisplay
              order={order}
              onDelete={deleteFromCustomer}
              modifyCustomization={modifyCustomization}
              modifyPriceString={modifyPrice}
            />
          </ListItem>
        ))}
      </List>

      <HStack justifyContent={"space-between"}>
        <Button
          colorScheme="green"
          margin={3}
          marginTop={10}
          onClick={() => addToCustomerList(customer)}
        >
          Add to Customer List
        </Button>
        <Text margin={3} background={"yellow"} fontSize="xl">
          {"Total: $" + calculateTotalPrice(customer.orderList)}
        </Text>
      </HStack>
    </>
  );
};

export default AddCustomerPage;
