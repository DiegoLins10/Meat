import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { MEAT_API } from "../app.api";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { Order } from "./order.model";

@Injectable()
export class OrderService{

    constructor(private cartService: ShoppingCartService, private http: HttpClient){}


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

    checkOrder(order: Order): Observable<string>
    {
        type Header = { [header: string]: string }
        const headers: Header = { 'Content-Type': 'application/json' }
        return this.http.post<string>(`${MEAT_API}/orders`, 
                                    JSON.stringify(order), 
                                    { headers })
                                    .pipe(map((body: any) => body.id))
                                    
    }

    clear(){
        this.cartService.clear();
    }
}