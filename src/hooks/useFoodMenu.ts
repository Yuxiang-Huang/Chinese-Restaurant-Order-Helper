export interface Order {
  id: string;
  count: number;
  mainName: string;
  mainCustomization: string;
  sideName: string;
  sideCustomization: string;
  totalPrice: number;
  unitPrice: number;
}

const useFoodMenu = () => {
  // dict of mixing main with side
  const togetherDict: { [key: string]: number } = {};

  // by itself, with French Fries / Fried Rice / White Rice, Pork or Chicken Fried Rice, Beef or Shrimp Fried Rice
  const mainType0Dict: { [key: string]: number[] } = {
    "Fried Chicken Wings": [6, 8, 8.75, 9.5],
    "Fried Half Chicken": [6.5, 8.5, 9.25, 9.75],
    "Chicken Wings w. Garlic Sauce": [6.5, 8.5, 9.25, 10],
    "Bar-B-Q Wing": [6.5, 8.5, 9.25, 10],
    "Honey Wing": [6.5, 8.5, 9.25, 10],
    "Fried Scallops (8)": [4.5, 6.25, 7.25, 7.75],
    "Chicken Gizzards": [4.75, 6.5, 7.25, 7.75],
    "Chicken Liver": [4.75, 6.5, 7.25, 7.75],
    "Fried Boneless Chicken": [5.75, 7.5, 8.25, 8.75],
    "Boneless Spare Ribs": [6.75, 8.5, 9.25, 9.75],
    "Spare Rib Tips": [5.25, 7, 7.75, 8.25],
    "Fried Pork Chop (2)": [5.25, 7, 7.75, 8.25],
    "Fried Crab Sticks (8)": [4.5, 6.25, 7.25, 7.75],
    "Fried Shrimp (20)": [5.75, 7.5, 8.25, 8.75],
    "Fried Jumbo Shrimp (8)": [7.5, 9, 9.75, 10.25],
    "Fried Whiting Fish (4)": [5.5, 7.5, 8.25, 8.75],
    "Chicken Nuggets (8)": [4.5, 6.25, 7.25, 7.75],
    "Long Spare Ribs": [8.5, 10, 10.5, 11],
  };

  // small, large, with type0, with type1 small, with type 1 large
  const sideDict: { [key: string]: number[] } = {
    "French Fries": [2.75, 5, -100, 1.5],
    "Fried Green Banana": [3.5, 6.5, 3.25, 3],
    "Fried Sweet Banana": [3.75, 7, 3.5, 3.25],

    "White Rice": [1.75, 3, -100, 0, 0],
    "Fried Rice": [3.0, 5.5, -100, 0.75, 1.25],
    "Vegetable Fried Rice": [4.5, 8, -100, 1.5, 3],
    "Roast Pork Fried Rice": [4.75, 8.5, -100, 1.5, 3],
    "Chicken Fried Rice": [4.75, 8.5, -100, 1.5, 3],
    "Beef Fried Rice": [5.5, 9.5, -100, 2, 3.75],
    "Shrimp Fried Rice": [5.5, 9.5, -100, 2, 3.75],
    "House Special Fried Rice": [6.5, 11, 5.5, 5, 5],

    "Lo Mein": [5, 8, 4, 3.5],
    "Vegetable Lo Mein": [5.5, 9.25, 5, 4.25],
    "Roast Pork Lo Mein": [5.75, 10, 5.25, 4.5],
    "Chicken Lo Mein": [5.75, 10, 5.25, 4.5],
    "Beef Lo Mein": [6.5, 10.75, 6, 5.25],
    "Shrimp Lo Mein": [6.5, 10.75, 6, 5.25],
    "House Special Lo Mein": [7.5, 12, 7, 6],
  };

  // main type 0 with side
  Object.keys(mainType0Dict).map((mainKey) => {
    togetherDict[mainKey] = mainType0Dict[mainKey][0];
    Object.keys(sideDict).map((sideKey) => {
      switch (sideKey) {
        case "French Fries":
        case "White Rice":
        case "Fried Rice":
          togetherDict[mainKey + " with " + sideKey] =
            mainType0Dict[mainKey][1];
          break;
        case "Vegetable Fried Rice":
        case "Roast Pork Fried Rice":
        case "Chicken Fried Rice":
          togetherDict[mainKey + " with " + sideKey] =
            mainType0Dict[mainKey][2];
          break;
        case "Beef Fried Rice":
        case "Shrimp Fried Rice":
          togetherDict[mainKey + " with " + sideKey] =
            mainType0Dict[mainKey][3];
          break;
        default:
          togetherDict[mainKey + " with " + sideKey] =
            mainType0Dict[mainKey][0] + sideDict[sideKey][2];
      }
    });
  });
  togetherDict["Large Long Spare Ribs"] = 15;

  const mainType1NoMeatDict: { [key: string]: number[] } = {
    " w. Broccoli": [7.5, 12.5],
    " w. Mixed Veg": [7.5, 12.5],
    " w. Mushrooms": [7.5, 12.5],
    " w. Oyster Sauce": [7.5, 12.5],
    " w. Garlic Sauce": [7.5, 12.5],
    " w. Curry Sauce": [7.5, 12.5],
    " w. Black Bean Sauce": [7.5, 12.5],

    " w. Pepper & Tomato": [8, 13.25],
  };

  const meatTypeDict: { [key: string]: number[] } = {
    "Roast Pork": [0, 0],
    Chicken: [0, 0.25],
    Beef: [0.5, 1.5],
    Shrimp: [0.5, 1.5],
  };

  const mainType1Dict: { [key: string]: number[] } = {
    Broccoli: [5.75, 9.75],
    "Mix Veg": [6, 10],

    "Plain Lobster Sauce": [5.5, 10],
    "Shrimp w. Lobster Sauce": [8, 14],

    "Sweet & Sour Pork": [7, 12.25],
    "Sweet & Sour Chicken": [7, 12.25],
    "Sweet & Sour Shrimp": [8, 14],
    "Sweet & Sour Rib Tips": [8, 13.5],

    "Hot & Spicy Pork": [7.5, 12.5],
    "Hot & Spicy Chicken": [7.5, 12.75],
    "Hot & Spicy Beef": [8, 14],
    "Hot & Spicy Shrimp": [8, 14],

    "General Tso's Chicken": [7.5, 13],
    "Sesame Chicken": [7.75, 13.5],
    "Orange Chicken": [8, 14],

    "Vegetable Egg Foo Young": [8.5],
    "Roast Pork Egg Foo Young": [8.75],
    "Chicken Egg Foo Young": [8.75],
    "Beef Egg Foo Young": [9.5],
    "Shrimp Egg Foo Young": [9.5],
    "Lobster Egg Foo Young": [11],
    "Crab Meat Egg Foo Young": [9],
  };

  // create full main type 1 dict by mixing meat types with mainType2NoMeat
  Object.keys(mainType1NoMeatDict).map((mainKey) => {
    Object.keys(meatTypeDict).map((meatKey) => {
      mainType1Dict[meatKey + mainKey] = [
        mainType1NoMeatDict[mainKey][0] + meatTypeDict[meatKey][0],
        mainType1NoMeatDict[mainKey][1] + meatTypeDict[meatKey][1],
      ];
    });
  });

  // main type 1 with side
  Object.keys(mainType1Dict).map((mainKey) => {
    const priceList = mainType1Dict[mainKey];
    if (priceList.length > 1) {
      // small, large by itself option
      togetherDict["Small " + mainKey] = priceList[0];
      togetherDict["Large " + mainKey] = priceList[1];
      // small, large with side option
      Object.keys(sideDict).map((sideKey) => {
        togetherDict[mainKey + " with " + sideKey] =
          priceList[0] + sideDict[sideKey][3];
        if (sideDict[sideKey].length > 4) {
          togetherDict[mainKey + " (Large) with " + sideKey] =
            priceList[1] + sideDict[sideKey][4];
        }
      });
    } else {
      // no small option
      togetherDict[mainKey] = priceList[0];
      Object.keys(sideDict).map((sideKey) => {
        if (sideDict[sideKey].length > 4) {
          togetherDict[mainKey + " with " + sideKey] =
            priceList[0] + sideDict[sideKey][4];
        }
      });
    }
  });

  // sides by itself
  Object.keys(sideDict).map((sideKey) => {
    togetherDict["Small " + sideKey] = sideDict[sideKey][0];
    togetherDict["Large " + sideKey] = sideDict[sideKey][1];
  });

  // individual food
  const indivDict: { [key: string]: number } = {
    "Shrimp Egg Roll": 1.5,
    "Egg Roll": 1.5,
    "Spring Roll": 2.25,
    "Fried Wonton (6)": 2.75,
    "Fried Wonton (12)": 4.75,
    "Onion Rings (10)": 2.5,
    "Fried Dumplings (8)": 7,
    "Steamed Dumplings (8)": 7,
    "Apple Stick (8)": 2.5,

    "Pork Chop Sandwich (2)": 5.75,
    "Whiting Fish Chop Sandwich (2)": 6,
    "Chicken Leg Sandwich (2)": 5.75,
    "Boneless Chicken Sandwich (2)": 6.25,

    "Small Vegetable Chow Mei Fun": 6,
    "Large Vegetable Chow Mei Fun": 10,
    "Small Roast Pork Chow Mei Fun": 6.25,
    "Large Roast Pork Chow Mei Fun": 10.5,
    "Small Chicken Chow Mei Fun": 6.25,
    "Large Chicken Chow Mei Fun": 10.5,
    "Small Beef Chow Mei Fun": 7,
    "Large Beef Chow Mei Fun": 11,
    "Small Shrimp Chow Mei Fun": 7,
    "Large Shrimp Chow Mei Fun": 11,
    "Small House Special Chow Mei Fun": 7.75,
    "Large House Special Chow Mei Fun": 12,

    "Can Soda": 1.25,
    "Small Ice Tea": 1.25,
    "Large Ice Tea": 2,
    "Small Lemonade": 1.25,
    "Large Lemonade": 2,
    "Bottle Soda": 1.5,
    "Bottle Water": 1,

    "Side Sauce": 1,
  };

  //#region soup and combo
  const soupDict: { [key: string]: number[] } = {
    "Wonton Mix Egg Drop Soup": [3.75, 6],
    "Wonton Soup": [2.75, 4.75],
    "Egg Drop Soup": [2.75, 4.75],
    "Chicken w. Noodles Soup": [2.75, 4.75],
    "Chicken w. Rice Soup": [2.75, 4.75],
    "House Special Wonton Soup": [7.5],
    "Roast Pork Yat Gaw Mein": [6.5],
    "Chicken Yat Gaw Mein": [6.5],
    "Beef Yat Gaw Mein": [6.75],
    "Shrimp Yat Gaw Mein": [6.75],
    "House Special Yat Gaw Mein": [7.5],
    "Hot & Sour Soup": [3.5, 6],
  };

  Object.keys(soupDict).map((soupKey) => {
    if (soupDict[soupKey].length > 1) {
      indivDict["Small " + soupKey] = soupDict[soupKey][0];
      indivDict["Large " + soupKey] = soupDict[soupKey][1];
    } else {
      indivDict["Large " + soupKey] = soupDict[soupKey][0];
    }
  });

  const comboDict: { [key: string]: number } = {
    "Chicken Chow Mein Combo": 8.25,
    "Roast Pork Chow Mein Combo": 8.25,
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

  // combine everything and output
  const priceDict = { ...togetherDict, ...indivDict, ...comboDict };
  const foodList = Object.keys(priceDict).filter(
    (foodName) => !foodName.includes("(Large)")
  );

  return { foodList, priceDict, mainType1Dict };
};

export default useFoodMenu;
