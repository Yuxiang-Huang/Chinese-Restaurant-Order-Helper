export interface OrderItem {
    id: number,
    name: string,
    price: number
}

const useFoodMenu = () => {
    const foodMenu = {
        "Chicken Broccoli": 5,
        "Beef Broccoli": 5
    }
    // let foodMenu = new Array<FoodItem>();
    // foodMenu.push(
    //     {id: 1, name: "Chicken Broccoli", price: 5},
    //     {id: 2, name: "Beef Broccoli", price: 5}
    // )

    return Object.keys(foodMenu);
}

export default useFoodMenu;


