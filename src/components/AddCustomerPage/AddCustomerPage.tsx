import { Link } from "react-router-dom";
import nextId from "react-id-generator";

import { List, ListItem, Button, HStack, Text } from "@chakra-ui/react";
import { produce } from "immer";

import { Customer, calculateTotalPrice } from "../../App";
import SearchBar from "./Top/SearchBar";
import OrderDisplay from "./Bottom/OrderDisplay";

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
        // default count for chicken wings is 4
        let count = 1;
        if (foodName === "Fried Chicken Wings") {
          count = 4;
        }

        let mainName = foodName;
        let sideName = "";
        if (foodName.indexOf("with") !== -1) {
          mainName = foodName.substring(0, foodName.indexOf("with") - 1);
          sideName = foodName.substring(foodName.indexOf("with") + 5);
        }

        draft.orderList.push({
          id: nextId(),
          count: count,
          mainName: mainName,
          sideName: sideName,
          totalPrice: p,
          unitPrice: p,
        });
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

  // modify the price of an order from the order list of an customer
  const modifyPrice = (id: string, newPrice: number) => {
    setCurCustomer(
      produce((draft) => {
        const orderToChange = draft.orderList.find((order) => order.id === id);
        if (orderToChange) orderToChange.totalPrice = newPrice;
      })
    );
  };

  // modify the count of an order from the order list of an customer
  const modifyCount = (
    id: string,
    valueAsString: string,
    valueAsNumber: number
  ) => {
    valueAsString;
    if (valueAsNumber === 0) {
      deleteFromCustomer(id);
    } else {
      setCurCustomer(
        produce((draft) => {
          const orderToChange = draft.orderList.find(
            (order) => order.id === id
          );
          if (orderToChange) {
            orderToChange.count = valueAsNumber;
            // outlier: chicken wings
            if (
              orderToChange.mainName === "Fried Chicken Wings" &&
              !orderToChange.sideName
            ) {
              switch (orderToChange.count) {
                case 1:
                  orderToChange.totalPrice = 3.75;
                  break;
                case 2:
                  orderToChange.totalPrice = 4.5;
                  break;
                case 3:
                  orderToChange.totalPrice = 5.25;
                  break;
                default:
                  orderToChange.totalPrice = 1.5 * orderToChange.count;
                  break;
              }
            } else {
              orderToChange.totalPrice =
                orderToChange.count * orderToChange.unitPrice;
            }
          }
        })
      );
    }
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
              modifyCustomization={modifyCustomization}
              modifyPriceString={modifyPrice}
              modifyCount={modifyCount}
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
