import type { LocalStorage } from "../vite-env.d.ts";
import type { MenuItem } from "./data.ts";
import { changeOrder, getCurrentOrder, getTotalPrice } from "./localStorage.ts"
import menuArray from "./data.ts";
import { renderMenuItems } from "./menu.ts";
/**
 * @abstract adds the order to the users order
 * @param id is the ID from the button 
 */
function addOrderItem(id:number){
    // update localStorage
    changeOrder(1, id);
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
    // could definitely use a refactor!!!! very repetitive code here
    const li = document.createElement('li')
    li.classList.add('order-summary-item', 'subgrid-columns')
    const p = document.createElement('p')
    p.classList.add('order-summary-item-name')
    p.textContent = name
    li.appendChild(p)
    const btn = document.createElement('button')
    btn.classList.add('order-summary-remove-btn')
    btn.textContent = 'remove'
    btn.setAttribute('data-remove-id', id.toString())
    li.appendChild(btn)
    const p2 = document.createElement('p')
    p2.classList.add('order-summary-price')
    p2.textContent = `$${price}`
    li.appendChild(p2)
    // less safe way to do this
    // li.innerHTML = `<p class='order-summary-item-name'>${name}</p> 
    //             <button data-remove-id='${id}' class='order-summary-remove-btn'>remove</button>
    //             <p class='order-summary-price'>$${price}</p>`
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
    // reduce amount in localStorage
    changeOrder(-1, id)
    
    if(!orderSummaryList.children.length){
        // need to hide the order-summary as nothing ordered
        const orderSummary = document.getElementById("order-summary") as HTMLElement
        orderSummary.classList.add('hidden')
    }
    updatePriceTotal()
}
/**
 * @abstract updates the price specifically for price total
 * based on new add or delete of item by user
 */
function updatePriceTotal(){
    const priceTotalElement = document.getElementById('order-summary-price') as HTMLElement
    
    priceTotalElement.textContent = `$${getTotalPrice()}`
}

/**
 * @abstract This function builds the order summary area when needed
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
        const val = lsObjects[key]  satisfies number
        const menuItem = menuArray.find(menu=>menu.id===Number.parseInt(key)) as MenuItem
        if(val){
            for(let i=0;i<val;i++) renderOrderItem(menuItem)
        } 
    }
}
/**
 * @abstract initialises the menu and if neccesary shows 
 * users previous order
 * @description mostly used to reduce imports into main.ts
 */
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