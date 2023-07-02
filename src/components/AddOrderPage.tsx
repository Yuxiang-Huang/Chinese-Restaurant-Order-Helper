import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import nextId from "react-id-generator";

import { List, ListItem, Button, HStack, Text } from "@chakra-ui/react";
import { produce } from "immer";

import { calculateTotalPrice } from "../App";
import useFoodMenu, { OrderItem } from "../hooks/useFoodMenu";
import SearchBar from "./SearchBar";
import OrderItemDisplay from "./OrderItemDisplay";

interface Props {
  addToOrderList: (order: OrderItem[]) => void;
  order: OrderItem[];
  setOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>;
}

const AddOrderPage = ({ addToOrderList, order, setOrder }: Props) => {
  //#region Initial Declaration
  const [fullFoodList, setFullFoodList] = useState<string[]>([]);
  const [priceDict, setPriceDict] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // full food list and price dictionary from useFoodMenu (optimized to be called once)
    const foodMenu = useFoodMenu();
    setFullFoodList(foodMenu.foodList);
    setPriceDict(foodMenu.priceDict);
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
          {"Total: $" + calculateTotalPrice(order)}
        </Text>
      </HStack>
    </>
  );
};

export default AddOrderPage;
