import { Link } from "react-router-dom";
import nextId from "react-id-generator";

import { List, ListItem, Button, HStack, Text } from "@chakra-ui/react";
import { produce } from "immer";

import { Order, calculateTotalPrice } from "../../App";
import SearchBar from "./SearchBar";
import OrderItemDisplay from "./OrderItemDisplay";

interface Props {
  order: Order;
  fullFoodList: string[];
  priceDict: { [key: string]: number };
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  addToOrderList: (order: Order) => void;
}

const AddOrderPage = ({
  order,
  fullFoodList,
  priceDict,
  setOrder,
  addToOrderList,
}: Props) => {
  //#region Initial Declaration

  //#endregion

  //#region Order

  // add food to order (called when a food button is clicked)
  const addToOrder = (foodName: string) => {
    const p = priceDict[foodName];
    setOrder(
      produce((draft) => {
        draft.orderItemList.push({ id: nextId(), name: foodName, price: p });
      })
    );
  };

  const deleteFromOrder = (id: string) => {
    setOrder(
      produce((draft) => {
        draft.orderItemList = draft.orderItemList.filter(
          (orderItem) => orderItem.id !== id
        );
      })
    );
  };

  const modifyPrice = (id: string, newPrice: number) => {
    setOrder(
      produce((draft) => {
        const orderItemToChange = draft.orderItemList.find(
          (orderItem) => orderItem.id === id
        );
        if (orderItemToChange) orderItemToChange.price = newPrice;
      })
    );
  };

  const modifyCustomization = (
    id: string,
    newCustomization: string,
    main: boolean
  ) => {
    setOrder(
      produce((draft) => {
        const orderItemToChange = draft.orderItemList.find(
          (orderItem) => orderItem.id === id
        );
        if (orderItemToChange)
          if (main) {
            orderItemToChange.mainCustomization = newCustomization;
          } else {
            orderItemToChange.sideCustomization = newCustomization;
          }
      })
    );
  };

  //#endregion

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Link to="/OrderList">
          <Button colorScheme="blue" margin={3}>
            View All Orders
          </Button>
        </Link>
        <Link to="/Menu">
          <Button colorScheme="orange" margin={3}>
            View Menu
          </Button>
        </Link>
      </HStack>

      <SearchBar fullFoodList={fullFoodList} addToOrder={addToOrder} />

      <List spacing={3} margin={3}>
        {order.orderItemList.map((orderItem, index) => (
          <ListItem key={index}>
            <OrderItemDisplay
              orderItem={orderItem}
              onDelete={deleteFromOrder}
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
          onClick={() => addToOrderList(order)}
        >
          Add to Order List
        </Button>
        <Text margin={3} background={"yellow"} fontSize="xl">
          {"Total: $" + calculateTotalPrice(order.orderItemList)}
        </Text>
      </HStack>
    </>
  );
};

export default AddOrderPage;
