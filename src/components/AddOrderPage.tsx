import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import nextId from "react-id-generator";

import { List, ListItem, Button, HStack, Text } from "@chakra-ui/react";
import { produce } from "immer";

import SearchBar from "./SearchBar";
import useFoodMenu, { OrderItem } from "../hooks/useFoodMenu";
import OrderItemDisplay from "./OrderItemDisplay";

interface Props {
  addToOrderList: (order: OrderItem[]) => void;
}

const AddOrderPage = ({ addToOrderList }: Props) => {
  //#region Initial Declaration
  const storage = window.sessionStorage;

  const [fullFoodList, setFullFoodList] = useState<string[]>([]);
  const [priceDict, setPriceDict] = useState<{ [key: string]: number }>({});
  const [order, setOrder] = useState<OrderItem[]>([]);

  useEffect(() => {
    // full food list and price dictionary from useFoodMenu (optimized to be called once)
    const foodMenu = useFoodMenu();
    setFullFoodList(foodMenu.foodList);
    setPriceDict(foodMenu.priceDict);

    // order from session storage
    const rawValue = storage.getItem("order");
    if (rawValue) setOrder(JSON.parse(rawValue));
  }, []);

  //#endregion

  //#region Order

  // add food to order (called when a food button is clicked)
  const addToOrder = (foodName: string) => {
    const p = priceDict[foodName];
    setOrder([...order, { id: nextId(), name: foodName, price: p }]);
  };

  const deleteFromOrder = (id: string) => {
    setOrder(order.filter((orderItem) => orderItem.id !== id));
  };

  const modifyPrice = (id: string, newPrice: number) => {
    setOrder(
      produce((draft) => {
        const orderItemToChange = draft.find(
          (orderItem) => orderItem.id === id
        );
        if (orderItemToChange) orderItemToChange.price = newPrice;
      })
    );
  };

  const modifyCustomization = (id: string, newCustomization: string) => {
    setOrder(
      produce((draft) => {
        const orderItemToChange = draft.find(
          (orderItem) => orderItem.id === id
        );
        if (orderItemToChange)
          orderItemToChange.customization = newCustomization;
      })
    );
  };

  // sync order wth session storage
  useEffect(() => {
    if (order.length > 0) storage.setItem("order", JSON.stringify(order));
  }, [order]);

  //#endregion

  return (
    <>
      <Link to="/OrderList">
        <Button colorScheme="blue" margin={3}>
          View All Orders
        </Button>
      </Link>

      <SearchBar fullFoodList={fullFoodList} addToOrder={addToOrder} />

      <List spacing={3} margin={3}>
        {order.map((orderItem, index) => (
          <ListItem key={index}>
            <OrderItemDisplay
              orderItem={orderItem}
              onDelete={deleteFromOrder}
              modifyCustomizationParent={modifyCustomization}
              modifyPriceParent={modifyPrice}
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
          {"Total: $" + calculateTotalPrice(order)}
        </Text>
      </HStack>
    </>
  );
};

const calculateTotalPrice = (order: OrderItem[]) => {
  let total = 0;
  order.map((OrderItem) => (total += OrderItem.price));
  return total;
};

export default AddOrderPage;
