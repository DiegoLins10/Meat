import { MenuItem } from "../menu-item/menu-item.model";
import { CartItem } from "./cart-item.model"

export class ShoppingCartService{
    items: CartItem[] = []

    clear(){
        this.items = [];
    }

    addItem(item: MenuItem){
        let foundItem = this.items.find((rs) => rs.menuItem.id === item.id);
        if(foundItem){
            this.increaseQty(foundItem);
        }else{
            this.items.push(new CartItem(item));
        }
    }

    increaseQty(item: CartItem){
        item.quantity = item.quantity + 1;
    }

    decreaseQty(item: CartItem){
        item.quantity = item.quantity - 1;
        if(item.quantity === 0){
            this.removeItem(item);
        }
    }

    removeItem(item: CartItem){
        this.items.splice(this.items.indexOf(item), 1)
    }

    total(): number{
        return this.items
        .map(item => item.value()) //cria um array de numeros
        .reduce((prev, value) => prev + value, 0) // usa o reduce para fazer a soma
    }
}