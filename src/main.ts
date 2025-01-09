import menuArray ,{ type MenuItem } from "./data.ts";

document.addEventListener('click', handleClick)

function handleClick(e:Event){
    // const menuItem = menuArray.find(item => item.id === parseInt((e.target as HTMLButtonElement).dataset.id));
    // if(menuItem){
    //     const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as MenuItem[];
    //     const existingItem = cartItems.find(item => item.id === menuItem.id);
    //     if(existingItem){
    //         existingItem.quantity++;
    //     } else {
    //         menuItem.quantity = 1;
    //         cartItems.push(menuItem);
    //     }
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
    //     renderCartItems();
    // }
}

const calculateTotalPrice = (items: MenuItem[]): number => {
    return items.reduce((total, item) => total + item.price, 0);
}

const filterItemsByIngredient = (items: MenuItem[], ingredient: string): MenuItem[] => {
    return items.filter(item => item.ingredients.includes(ingredient));
}

const renderMenuItem =({id,name,ingredients,price,emoji}:MenuItem)=>{
    return `
    <div class='subgrid-columns menu-item'>
        <p class='menu-icon'>${emoji}</p>
        <div class='menu-item-info'>
            <h2 class='menu-item-title'>${name}</h2>
            <p class='menu-item-ingredients'>${ingredients.join(',')}</p>
            <p class='menu-item-price'>$${price}</p>
        </div>
        <button class='menu-add-btn' data-id='${id}'>+</button>
    </div>`
}

const renderMenuItems = (items: MenuItem[]) => {
    const app = document.getElementById('app')
    if(app){
        app.innerHTML = items.map(renderMenuItem).join('');
    }

}

renderMenuItems(menuArray)