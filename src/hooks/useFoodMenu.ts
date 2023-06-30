export interface FoodMenuItem {
    id: number,
    name: string,
    price: number
}

const useFoodMenu = () => {
    let foodMenu = new Array<FoodMenuItem>();
    foodMenu.push(
        {id: 1, name: "Chicken Broccoli", price: 5},
        {id: 2, name: "Beef Broccoli", price: 5}
    )

    return foodMenu
}

export default useFoodMenu;


