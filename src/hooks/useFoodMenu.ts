export interface OrderItem {
    id: string,
    name: string,
    customization?: string,
    price: number
}

const useFoodMenu = () => {
    const mainDict: { [key: string]: number } =
    {
        "Chicken Broccoli": 7.5,
        "Beef Broccoli": 8
    }

    const comboDict: {[key: string]: number} = {
        "Chicken Chow Mein Combo": 8.25,
        "Pork Chow Mein Combo": 8.25,
        "Shrimp Chow Mein Combo": 8.50,
        "Beef Chow Mein Combo": 8.50,
        "Spare Ribs Combo": 11.00,
        "Roast Pork Broccoli Combo": 9.75,
        "Shrimp w. Lobster Sauce Combo": 10.00,
        "Pepper Steak w. Onion Combo": 10.00,
        "Beef w. Broccoli Combo": 10.00,
        "Beef Lo Mein Combo": 9.50,
        "Sweet & Sour Chicken Combo": 9.00,
        "Chicken w. Garlic Sauce Combo": 9.75,
        "General Tso's Chicken Combo": 10.00,
        "Roast Pork Lo Mein Combo": 9.25,
        "Shrimp w. Broccoli Combo": 9.75,
        "Chicken w. Broccoli Combo": 9.75,
        "Roast Pork Egg Foo Young Combo": 9.75,
        "Chicken Egg Foo Young Combo": 9.75,
        "Beef Egg Foo Young Combo": 10.00,
        "Shrimp Egg Foo Young Combo": 10.00,
    }

    const priceDict = {...mainDict, ...comboDict}

    const foodList = Object.keys(priceDict)

    return { foodList, priceDict };
}

export default useFoodMenu;


