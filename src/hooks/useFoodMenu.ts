export interface FoodMenuItem {
    name: string,
    price: number
}

const useFoodMenu = () => {
    let foodMenu = new Array<FoodMenuItem>();
    foodMenu.push(
        {name: "Chicken Broccoli", price: 5}
    )

    return foodMenu
}

export default useFoodMenu;


