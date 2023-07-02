export interface OrderItem {
  id: string;
  name: string;
  mainCustomization?: string;
  sideCustomization?: string;
  price: number;
}

const useFoodMenu = () => {
  const mainType0Dict: { [key: string]: number } = {
    "Fried Chicken Wings": 6,
  };

  const mainType1Dict: { [key: string]: number } = {
    "Fried Scallops": 4.5,
  };

  const mainType2Dict: { [key: string]: number[] } = {
    "Chicken Broccoli": [7.5, 12.75],
    "Beef Broccoli": [8, 14],
  };

  const sideDict: { [key: string]: number[] } = {
    "Fried Rice": [3.0, 5.5, 2, 1.75, 0.75],
    "Chicken Fried Rice": [4.75, 8.5, 2.75, 2.75, 1.5],
  };

  const togetherDict: { [key: string]: number } = {};

  Object.keys(mainType0Dict).map((mainKey) => {
    togetherDict[mainKey] = mainType0Dict[mainKey];
    Object.keys(sideDict).map((sideKey) => {
      togetherDict[mainKey + " with " + sideKey] =
        mainType0Dict[mainKey] + sideDict[sideKey][2];
    });
  });

  Object.keys(mainType1Dict).map((mainKey) => {
    togetherDict[mainKey] = mainType1Dict[mainKey];
    Object.keys(sideDict).map((sideKey) => {
      togetherDict[mainKey + " with " + sideKey] =
        mainType1Dict[mainKey] + sideDict[sideKey][3];
    });
  });

  Object.keys(mainType2Dict).map((mainKey) => {
    togetherDict["Small" + mainKey] = mainType2Dict[mainKey][0];
    togetherDict["Large" + mainKey] = mainType2Dict[mainKey][1];
    Object.keys(sideDict).map((sideKey) => {
      togetherDict[mainKey + " with " + sideKey] =
        mainType2Dict[mainKey][0] + sideDict[sideKey][4];
    });
  });

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

  const priceDict = { ...togetherDict, ...comboDict };

  const foodList = Object.keys(priceDict);

  return { foodList, priceDict };
};

export default useFoodMenu;
