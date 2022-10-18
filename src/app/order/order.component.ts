import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from '../shared/radio/radio-option';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, AbstractControlOptions } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm!: FormGroup;
  delivery: number = 5;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numeroPattern = /^[0-9]*$/

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão de refeição', value: 'REF'}, 
  ];

  constructor(private orderService: OrderService, private router: Router, private formbuider: FormBuilder) { }

  ngOnInit(): void {
    this.orderForm = this.formbuider.group({
      name: this.formbuider.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formbuider.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formbuider.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      addres: this.formbuider.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formbuider.control('', [Validators.required, Validators.pattern(this.numeroPattern)]),
      optionalAddress: this.formbuider.control(''),
      paymentOption: this.formbuider.control('', [Validators.required]),
    }, {validator: OrderComponent.equalsTo} as AbstractControlOptions)
  }

  static equalsTo(group: AbstractControl) : {[key:string]: boolean } | undefined{
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    if(!email || !emailConfirmation){
      return undefined;
    }

    if(email.value !== emailConfirmation.value){
      return {emailsNotMatch:true}
    }
    return undefined;
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
