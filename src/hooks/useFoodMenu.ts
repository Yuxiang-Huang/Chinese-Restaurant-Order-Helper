export interface OrderItem {
    name: string,
    price: number
}

const useFoodMenu = () => {
    const priceDict: { [key: string]: number } =
    {
        "Chicken Broccoli": 5,
        "Beef Broccoli": 5
    }

    const foodList = Object.keys(priceDict)

    console.log("Only twice in dev");

    return { foodList, priceDict };
}

export default useFoodMenu;


