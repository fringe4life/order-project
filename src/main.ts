// functions related to managing user orders
import { addOrderItem as add,
    removeOrderItem as remove,
    initialise } from "./typescript/order.ts";
// is a way to avoid excessive user clicks
import { debounce } from "debouncing";

// debounced it to avoid excessive user clicks from adding more items then intended
document.addEventListener("click", debounce(handleClick, 250), false)

/**
 * @abstract handles click events on the buttons
 * @param e the Event that was triggered by click event handler
 */
function handleClick(e:MouseEvent){
		const target = e.target as HTMLButtonElement;
        // only the + buttons have data-id
		if (target.dataset.id) {
			add(Number.parseInt(target.dataset.id));
		} else if(target.dataset.removeId){ // only remove buttons have this data-remove-id
            remove(Number.parseInt(target.dataset.removeId))
        }
}

initialise()