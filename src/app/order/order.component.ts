import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from '../shared/radio/radio-option';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  delivery: number = 5;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão de refeição', value: 'REF'}, 
  ];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
  }

  itemsValue(): number{
    return this.orderService.itemsValue();
  }
  
  cartItems() : CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem){
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem){
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem){
    this.orderService.remove(item);
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems().map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    console.log(order);
    this.orderService.checkOrder(order).subscribe({
      next: res =>{
        this.router.navigate(['/order-summary']);
        console.log(`Compra concluida: ${res}`);
        this.orderService.clear();
      }, 
      error: erro => {
        console.log(erro);
      }
    });
  }

}
