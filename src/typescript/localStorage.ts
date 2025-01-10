import type{ LocalStorage } from "../vite-env.d.ts";

function getCurrentOrder(){
    const currentOrder = localStorage.getItem("currentOrder") 
    const lsObj = currentOrder && JSON.parse(currentOrder) || []
    return lsObj
}

function storeCurrentOrder(lsObj:LocalStorage.OrderSummary){
    localStorage.setItem('currentOrder',JSON.stringify(lsObj))
}

export {
    getCurrentOrder,
    storeCurrentOrder,
}