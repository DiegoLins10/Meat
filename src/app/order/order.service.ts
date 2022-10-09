import { Injectable } from "@angular/core";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";

@Injectable()
export class OrderService{

    constructor(private cartService: ShoppingCartService){}


    itemsValue(): number{
        return this.cartService.total();
    }

    cartItems(): CartItem[]{
        return this.cartService.items
    }

    // adiciona +1 
    increaseQty(item: CartItem){
        this.cartService.increaseQty(item);
    }

    //diminui -1
    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItem){
        this.cartService.removeItem(item);
    }
}