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
    }

    const priceDict = {...mainDict, ...comboDict}

    const foodList = Object.keys(priceDict)

    return { foodList, priceDict };
}

export default useFoodMenu;


