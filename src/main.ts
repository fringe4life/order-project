// functions related to managing user orders
import { showConfirmation } from "./components/confirmation.ts";
import { clearCurrentOrder } from "./components/localStorage.ts";
import { formatCreditCardNumber, showModal,closeModal } from "./components/modal.ts";
import { addOrderItem, removeOrderItem, initialise } from "./components/order.ts";
// is a way to avoid excessive user clicks
import { throttle } from "debouncing";

// initialises the menu items and if neccesary renders orders from localStorage
initialise()
// debounced it to avoid excessive user clicks from adding more items then intended
document.addEventListener("click", throttle(handleClick, 250), false)

// listen to submit 
document.addEventListener("submit", handleSubmit)

// listen for input
document.addEventListener('input', handleInput)

/**
 * @abstract handles click events on the buttons
 * @param e the Event that was triggered by click event handler
 */
function handleClick(e:MouseEvent){
    console.log(e)
	const target = e.target as HTMLButtonElement;
    

    // only the + buttons have data-id
	if (target.dataset.id) {
		addOrderItem(Number.parseInt(target.dataset.id));
	} else if(target.dataset.removeId){ // only remove buttons have this data-remove-id
        removeOrderItem(Number.parseInt(target.dataset.removeId))
    } else if (target.id === 'complete-order'){ //user wants to place order
        showModal("modal")
    } else if(target.id ==='payment-form'){
        closeModal("payment-form", "popover-modal-dismiss")
    }
}

function handleSubmit(e:Event){
    e.preventDefault()
    console.log(e)

    // close Modal
    closeModal("payment-form")
    const form = e.target as HTMLFormElement
    // user has completed order
    const formData = new FormData(form)
    const name = String(formData.get('name'))

    // hide order
    const orderSummary = document.getElementById('order-summary') as HTMLElement
    orderSummary.classList.add('hidden')

    // display completion screen with user name
    showConfirmation(name)
    // clear order summary
    clearCurrentOrder()

    // display completion screen with user name
    showConfirmation(name)
    // clear order summary
    clearCurrentOrder()
}

function handleInput(e:Event){
    const target = e.target as HTMLInputElement
    if(target.id === 'card-number'){
        console.log(target)
        formatCreditCardNumber(target)
    }
}