import { getChildFromTemplate } from "./utilities.ts";

function showConfirmation( name:string){
    const p = document.createElement('p')
    p.classList.add('order-confirmation-body', 'my-large')
    p.textContent = `Thanks, ${name}! Your order is on its way!`
    const orderConfirmation = document.getElementById('order-confirmation') as HTMLElement
    orderConfirmation.innerHTML = ''
    orderConfirmation.appendChild(p)
    
}


export {
    showConfirmation
}