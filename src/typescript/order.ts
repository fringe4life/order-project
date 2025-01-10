import type { LocalStorage } from "../vite-env.d.ts";
import type { MenuItem } from "./data.ts";
import { getCurrentOrder, storeCurrentOrder } from "./localStorage.ts"
import menuArray from "./data.ts";
import { renderMenuItems } from "./menu.ts";
/**
 * @abstract adds the order to the users order
 * @param id is the ID from the button 
 */
function addOrderItem(id:number){
    // typesafely access localStorage
    const lsObj = getCurrentOrder() satisfies LocalStorage.OrderSummary[]
    console.log(lsObj)
            
    // if item is not in currentOrder, add it with quantity 1
    // else increment quantity
    if (!lsObj[id]) {
        lsObj[id] = { quantity: 1 };
    } else {
        lsObj[id].quantity++;
    }
    storeCurrentOrder(lsObj)
    // find the item in menuArray by id, and pass it to renderOrderItem
    const menuItem = menuArray.find(menu=>menu.id===id) as MenuItem
            
    renderOrderItem(menuItem)
}
/**
 * @abstract renders an individual order item 
 * that the user wants to buy
 * @param is a MenuItem to be rendered to the ul
 *  
 */
function renderOrderItem({name,id,price}: MenuItem){
    let orderSummaryList = document.getElementById('order-summary-list') as HTMLElement
    if(!orderSummaryList) {
        renderOrder()
        orderSummaryList = document.getElementById('order-summary-list') as HTMLElement
    }
    const li = document.createElement('li')
    li.classList.add('order-summary-item', 'subgrid-columns')
    li.innerHTML = `<p class='order-summary-item-name'>${name}</p> 
                <button data-remove-id='${id}' class='order-summary-remove-btn'>remove</button>
                <p class='order-summary-price'>$${price}</p>`
    orderSummaryList.appendChild(li)
    updatePriceTotal()
}
/**
 * @abstract removes from the list the item that the user no longer wanted 
 * @param id the id provided by the button that was clicked
 */
function removeOrderItem(id:number){
    const orderSummaryList= document.getElementById('order-summary-list') as HTMLElement
    const itemToRemove = orderSummaryList.querySelector(`[data-remove-id='${id}']`)?.parentElement as HTMLLIElement
    orderSummaryList.removeChild(itemToRemove)
    const currentOrder = getCurrentOrder() satisfies LocalStorage.OrderSummary[]
    currentOrder[id]--
    updatePriceTotal()
    if(!orderSummaryList.children.length){
        // need to hide the order-summary as nothing ordered
        const orderSummary = document.getElementById("order-summary") as HTMLElement
        orderSummary.classList.add('hidden')
    }
}
/**
 * @abstract updates the price specifically for price total
 * based on new add or delete of item by user
 */
function updatePriceTotal(){
    const priceTotalElement = document.getElementById('order-summary-price') as HTMLElement
    const lsObj = getCurrentOrder() satisfies LocalStorage.OrderSummary[]
    let price = 0
    const lsArray = Array.from(lsObj)
    for(let id=0;id<lsArray.length;id++){
        const val = lsArray[id] as LocalStorage.Quantity
        if(val) {
            const menuItem = menuArray.find(menu=>menu.id===id) as MenuItem
            price += menuItem.price * val.quantity
        } else continue
    }
    priceTotalElement.textContent = `$${price}`
}

/**
 * This function builds the order summary area when needed
 */
function renderOrder(){

    // gets access to the section to put the template into
	const orderSummary = document.getElementById("order-summary") as HTMLElement
    // removes a class to hide the order summary if user deleted all items
    orderSummary.classList.remove('hidden')
    // uses the HTMLTemplateElement to generate the internals of the order summary
    // useful practise of the HTMLTemplateElement
    const template = document.getElementById("order-summary-template") as HTMLTemplateElement;
    const clonedTemplate = template.content.cloneNode(true);

    orderSummary.appendChild(clonedTemplate);

    updatePriceTotal()
}
/**
 * @abstract renders all items in localStorage
 */
function renderOrderItems(){
    const orderSummaryList = document.getElementById('order-summary-list') as HTMLElement
    orderSummaryList.innerHTML = ''
    const lsObjects = getCurrentOrder() satisfies LocalStorage.OrderSummary[]
    for(const key of Object.keys(lsObjects)){
        const {quantity} = lsObjects[key]  satisfies LocalStorage.Quantity
        const menuItem = menuArray.find(menu=>menu.id===Number.parseInt(key)) as MenuItem
        if(quantity > 1){
            for(let i=0;i<quantity;i++) renderOrderItem(menuItem)
        } else renderOrderItem(menuItem)
    }
}

function initialise(){
    // renders the menu items
    renderMenuItems(menuArray)

    // checks if user has order items in localStorage
    // if so render them
    if(getCurrentOrder().length > 0) {
        renderOrder()
        renderOrderItems()
    }
}

export {
    removeOrderItem,
    addOrderItem,
    initialise
}