import { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router";
import { useNavigate } from "react-router-dom";
import nextId from "react-id-generator";
import AddCustomerPage from "./components/AddCustomerPage/AddCustomerPage";
import CustomerListPage from "./components/CustomerListPage/CustomerListPage";
import useFoodMenu, { Order } from "./hooks/useFoodMenu";
import "./index.css";
import { produce } from "immer";
import { CustomerDescription } from "./components/CustomerListPage/DescriptionModal";

export interface Customer {
  id: string;
  description: CustomerDescription;
  orderList: Order[];
  paid: boolean;
  archived: boolean;
}

export const resetCurCustomer = () => {
  return {
    id: nextId(),
    description: {} as CustomerDescription,
    orderList: [],
    paid: false,
    archived: false,
  };
};

export const FunctionsContext = createContext({
  updateCustomerDescription: (
    id: string,
    newDescription: CustomerDescription
  ) => {
    console.log(id, newDescription);
  },
  pay: (customerToPay: Customer) => {
    console.log(customerToPay);
  },
  edit: (customerToEdit: Customer) => {
    console.log(customerToEdit);
  },
  archive: (customerToArchive: Customer) => {
    console.log(customerToArchive);
  },
  unarchive: (customerToArchive: Customer) => {
    console.log(customerToArchive);
  },
});

const App = () => {
  //#region Initialization and Synchronization
  const navigate = useNavigate();
  const storage = window.sessionStorage;

  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [archivedCustomerList, setArchivedCustomerList] = useState<Customer[]>(
    []
  );
  const [curCustomer, setCurCustomer] = useState<Customer>(resetCurCustomer());

  const [fullFoodList, setFullFoodList] = useState<string[]>([]);
  const [mainType1Dict, setMainType1Dict] = useState<{
    [key: string]: number[];
  }>({});
  const [priceDict, setPriceDict] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // full food list and price dictionary from useFoodMenu (optimized to be called once)
    const foodMenu = useFoodMenu();
    setFullFoodList(foodMenu.foodList);
    setPriceDict(foodMenu.priceDict);
    setMainType1Dict(foodMenu.mainType1Dict);

    // customer, customer list, and archived customer list from session storage
    let rawValue = storage.getItem("Current Customer");
    if (rawValue) setCurCustomer(JSON.parse(rawValue));
    rawValue = storage.getItem("Customer List");
    if (rawValue) setCustomerList(JSON.parse(rawValue));
    rawValue = storage.getItem("Archived Customer List");
    if (rawValue) setArchivedCustomerList(JSON.parse(rawValue));
  }, []);

  // sync customer wth session storage
  useEffect(() => {
    storage.setItem("Current Customer", JSON.stringify(curCustomer));
  }, [curCustomer]);

  // sync customer list wth session storage
  useEffect(() => {
    storage.setItem("Customer List", JSON.stringify(customerList));
  }, [customerList]);

  // sync archived customer list wth session storage
  useEffect(() => {
    storage.setItem(
      "Archived Customer List",
      JSON.stringify(archivedCustomerList)
    );
  }, [archivedCustomerList]);

  //#endregion

  //#region Customer List

  const addToCustomerList = (newCustomer: Customer) => {
    setCustomerList([newCustomer, ...customerList]);
    setCurCustomer(resetCurCustomer());
    navigate("/CustomerList");
  };

  const deleteFromCustomerList = (id: string) => {
    setCustomerList(customerList.filter((customer) => customer.id !== id));
    setCurCustomer(resetCurCustomer());
  };

  const updateCustomerList = (customerToUpdate: Customer) => {
    setCustomerList(
      customerList.map((customer) =>
        customer.id === customerToUpdate.id ? customerToUpdate : customer
      )
    );
    setCurCustomer(resetCurCustomer());
    navigate("/CustomerList");
  };

  //#endregion

  //#region Four buttons for Each Customer
  const updateCustomerDescription = (
    id: string,
    newDescription: CustomerDescription
  ) => {
    setCustomerList(
      produce((draft) => {
        const customerToChange = draft.find((customer) => customer.id === id);
        if (customerToChange) customerToChange.description = newDescription;
      })
    );
  };

  const pay = (customerToPay: Customer) => {
    if (customerToPay.archived) {
      setArchivedCustomerList(
        produce((draft) => {
          const customerToChange = draft.find(
            (customer) => customer.id === customerToPay.id
          );
          if (customerToChange) customerToChange.paid = !customerToChange.paid;
        })
      );
    } else {
      setCustomerList(
        produce((draft) => {
          const customerToChange = draft.find(
            (customer) => customer.id === customerToPay.id
          );
          if (customerToChange) customerToChange.paid = !customerToChange.paid;
        })
      );
    }
  };

  const edit = (customerToEdit: Customer) => {
    // navigate to add customer page
    navigate("/");

    // set customer to this customer
    setCurCustomer(customerToEdit);
  };

  const archive = (customerToArchive: Customer) => {
    // delete this customer from customer list
    setCustomerList(
      customerList.filter((customer) => customer.id !== customerToArchive.id)
    );
    // add this archived customer to archived customer list
    setArchivedCustomerList([
      { ...customerToArchive, archived: true },
      ...archivedCustomerList,
    ]);
  };

  const unarchive = (customerToArchive: Customer) => {
    // delete this customer from archived customer list
    setArchivedCustomerList(
      archivedCustomerList.filter(
        (customer) => customer.id !== customerToArchive.id
      )
    );
    // add this unarchived customer to customer list
    setCustomerList([
      ...customerList,
      { ...customerToArchive, archived: false },
    ]);
  };

  const functionsNeeded = {
    updateCustomerDescription,
    pay,
    edit,
    archive,
    unarchive,
  };

  //#endregion

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AddCustomerPage
            customer={curCustomer}
            fullFoodList={fullFoodList}
            mainType1Dict={mainType1Dict}
            priceDict={priceDict}
            setCurCustomer={setCurCustomer}
            addToCustomerList={addToCustomerList}
            deleteFromCustomerList={deleteFromCustomerList}
            editMode={customerList.some(
              (customer) => customer.id === curCustomer.id
            )}
            updateCustomerList={updateCustomerList}
          />
        }
      />
      <Route
        path="/CustomerList"
        element={
          <FunctionsContext.Provider value={functionsNeeded}>
            <CustomerListPage
              customerList={customerList}
              archivedCustomerList={archivedCustomerList}
            />
          </FunctionsContext.Provider>
        }
      />
    </Routes>
  );
};

// calculate the total price of an order list
export const calculateTotalPrice = (orderList: Order[]) => {
  let total = 0;
  orderList.map((order) => (total += order.totalPrice));
  return Number(total).toFixed(2);
};

export default App;
