import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CartItem } from 'src/app/restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input() items!: CartItem[]
  @Output() increaseQty = new EventEmitter<CartItem>();
  @Output() decreaseQty = new EventEmitter<CartItem>();
  @Output() remove = new EventEmitter<CartItem>();

  constructor() { }

  ngOnInit(): void {
  }

  emitIncreaseQty(item: CartItem){
    this.increaseQty.emit(item);
  }

  emitDecreaseQty(item: CartItem){
    this.decreaseQty.emit(item);
  }

  emitRemoveQty(item: CartItem){
    this.remove.emit(item);
  }
}
