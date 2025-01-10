/// <reference types="vite/client" />

export namespace LocalStorage {
    export type OrderSummary = {
        [id: number]: {
            quantity: number;
        };
    }
    export type Quantity = {quantity:number}
}