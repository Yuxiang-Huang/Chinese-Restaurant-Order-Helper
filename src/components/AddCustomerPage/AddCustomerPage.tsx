import nextId from "react-id-generator";

import { List, ListItem } from "@chakra-ui/react";
import { produce } from "immer";

import { Customer } from "../../App";
import SearchBar from "./Top/SearchBar";
import OrderDisplay from "./Bottom/OrderDisplay";
import TopBar from "./Top/TopBar";
import BottomBar from "./Bottom/BottomBar";

interface Props {
  customer: Customer;
  fullFoodList: string[];
  mainType1Dict: { [key: string]: number[] };
  priceDict: { [key: string]: number };
  setCurCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  deleteFromCustomerList: (id: string) => void;
  addToCustomerList: (customer: Customer) => void;
  editMode: boolean;
  updateCustomerList: (customer: Customer) => void;
}

const AddCustomerPage = ({
  customer,
  fullFoodList,
  mainType1Dict,
  priceDict,
  setCurCustomer,
  deleteFromCustomerList,
  addToCustomerList,
  editMode,
  updateCustomerList,
}: Props) => {
  // add an order to customer (called when a food button is clicked)
  const addToCustomer = (foodName: string) => {
    const p = priceDict[foodName];
    setCurCustomer(
      produce((draft) => {
        let mainName = foodName;
        let sideName = "";
        if (foodName.indexOf("with") !== -1) {
          mainName = foodName.substring(0, foodName.indexOf("with") - 1);
          sideName = foodName.substring(foodName.indexOf("with") + 5);
        }

        draft.orderList.push({
          id: nextId(),
          count: 1,
          mainName: mainName,
          mainCustomization: mainName === "Fried Chicken Wings" ? "4×; " : "",
          sideName: sideName,
          sideCustomization: "",
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
    priceDif: number,
    newCustomization: string,
    main: boolean,
    sizeChanged: boolean
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
          // change price
          orderToChange.unitPrice += priceDif;
          orderToChange.totalPrice =
            orderToChange.unitPrice * orderToChange.count;

          // name change
          if (sizeChanged) {
            if (orderToChange.mainName.includes(" (Large)")) {
              orderToChange.mainName = orderToChange.mainName.replace(
                " (Large)",
                ""
              );
            } else {
              orderToChange.mainName += " (Large)";
            }
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

    setCurCustomer(
      produce((draft) => {
        const orderToChange = draft.orderList.find((order) => order.id === id);
        if (orderToChange) {
          // count and price change
          orderToChange.count = valueAsNumber;
          orderToChange.totalPrice =
            orderToChange.count * orderToChange.unitPrice;
        }
      })
    );
  };

  // delete this customer
  const deleteCustomer = () => {
    deleteFromCustomerList(customer.id);
  };

  return (
    <>
      <TopBar deleteCustomer={deleteCustomer} />
      <SearchBar fullFoodList={fullFoodList} addToCustomer={addToCustomer} />
      <List>
        {customer.orderList.map((order, index) => (
          <ListItem key={index}>
            <OrderDisplay
              order={order}
              mainType1Dict={mainType1Dict}
              priceDict={priceDict}
              modifyCustomization={modifyCustomization}
              modifyPriceString={modifyPrice}
              modifyCount={modifyCount}
              deleteFromCustomer={deleteFromCustomer}
            />
          </ListItem>
        ))}
      </List>
      <BottomBar
        customer={customer}
        addToCustomerList={addToCustomerList}
        editMode={editMode}
        updateCustomerList={updateCustomerList}
      />
    </>
  );
};

export default AddCustomerPage;
