import menuArray ,{ type MenuItem } from "./data.ts";



const calculateTotalPrice = (items: MenuItem[]): number => {
    return items.reduce((total, item) => total + item.price, 0);
}

const filterItemsByIngredient = (items: MenuItem[], ingredient: string): MenuItem[] => {
    return items.filter(item => item.ingredients.includes(ingredient));
}

const render(){
  
}