import type{ MenuItem } from "./data.ts";

/**
 * 
 * @param takes a menu item as an object to make the html that will
 * display it 
 * @returns the html that will be rendered to the page
 */
const renderMenuItem =({id,name,ingredients,price,emoji}:MenuItem)=>{
    return `
    <div class='subgrid-columns menu-item my-large'>
        <p class='menu-icon'>${emoji}</p>
        <div class='menu-item-info'>
            <h2 class='menu-item-title'>${name}</h2>
            <p class='menu-item-ingredients'>${ingredients.join(',')}</p>
            <p class='menu-item-price'>$${price}</p>
        </div>
        <button class='menu-add-btn' data-id='${id}'>+</button>
    </div>`
}
/**
 * 
 * @param items the menuArray from data.ts
 * @abstract sets the menu-items in the html
 */
const renderMenuItems = (items: MenuItem[]) => {
    const app = document.getElementById('app') as HTMLElement
    app.innerHTML = items.map(renderMenuItem).join('');
}

export {
    renderMenuItems, 
    renderMenuItem,
}