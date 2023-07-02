export interface OrderItem {
  id: string;
  name: string;
  mainCustomization?: string;
  sideCustomization?: string;
  price: number;
}

const useFoodMenu = () => {
  const mainDict: { [key: string]: number } = {
    "Chicken Broccoli": 7.5,
    "Beef Broccoli": 8,
  };

  const sideDict: { [key: string]: number } = {
    "Fried Rice": 3.0,
    "Chicken Fried Rice": 4.75,
  };

  const togetherDict: { [key: string]: number } = {};

  Object.keys(mainDict).map((mainKey) =>
    Object.keys(sideDict).map((sideKey) => {
      togetherDict[mainKey + " with " + sideKey] =
        mainDict[mainKey] + sideDict[sideKey];
    })
  );

  const comboDict: { [key: string]: number } = {
    "Chicken Chow Mein Combo": 8.25,
    "Pork Chow Mein Combo": 8.25,
    "Shrimp Chow Mein Combo": 8.5,
    "Beef Chow Mein Combo": 8.5,
    "Spare Ribs Combo": 11.0,
    "Roast Pork Broccoli Combo": 9.75,
    "Shrimp w. Lobster Sauce Combo": 10.0,
    "Pepper Steak w. Onion Combo": 10.0,
    "Beef w. Broccoli Combo": 10.0,
    "Beef Lo Mein Combo": 9.5,
    "Sweet & Sour Chicken Combo": 9.0,
    "Chicken w. Garlic Sauce Combo": 9.75,
    "General Tso's Chicken Combo": 10.0,
    "Roast Pork Lo Mein Combo": 9.25,
    "Shrimp w. Broccoli Combo": 9.75,
    "Chicken w. Broccoli Combo": 9.75,
    "Roast Pork Egg Foo Young Combo": 9.75,
    "Chicken Egg Foo Young Combo": 9.75,
    "Beef Egg Foo Young Combo": 10.0,
    "Shrimp Egg Foo Young Combo": 10.0,
  };

  const priceDict = { ...mainDict, ...sideDict, ...togetherDict, ...comboDict };

  const foodList = Object.keys(priceDict);

  return { foodList, priceDict };
};

export default useFoodMenu;
