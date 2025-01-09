import menuArray ,{ type MenuItem } from "./data.ts";

document.addEventListener('click', handleClick)

// should debounce or throttle it for practise!!
/**
 * @abstract listens for click events on the buttons
 * @param e the Event that was triggered by click event handler
 */
function handleClick(e:Event){
		const target = e.target as HTMLButtonElement;
        // only the + buttons have data-id
		if (target.dataset.id) {
			const itemId = Number.parseInt(target.dataset.id);
            // typesafely access localStorage
			const currentOrder = localStorage.getItem("currentOrder") 
            const lsObj = currentOrder && JSON.parse(currentOrder) || []
            console.log(lsObj)
            
            // if item is not in currentOrder, add it with quantity 1
            // else increment quantity
            if (!lsObj[itemId]) {
                lsObj[itemId] = { quantity: 1 };
			} else {
                lsObj[itemId].quantity++;
            }
            localStorage.setItem("currentOrder", JSON.stringify(lsObj));
            console.log(lsObj)
		}
}
/**
 * 
 * @param takes a menu item as an object to make the html that will
 * display it 
 * @returns the html that will be rendered to the page
 */
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
/**
 * 
 * @param items the menuArray from data.ts
 * @abstract sets the menu-items in the html
 */
const renderMenuItems = (items: MenuItem[]) => {
    const app = document.getElementById('app')
    if(app){
        app.innerHTML = items.map(renderMenuItem).join('');
    }
}

renderMenuItems(menuArray)