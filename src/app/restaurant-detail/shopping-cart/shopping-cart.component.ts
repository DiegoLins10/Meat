import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    trigger('row', [
      state('ready', style({ opacity: 1 })),
      // essa transition animação causa o efeito de arrasta pra direita quando adiciona... o item
      transition('void => ready', [
        animate('300ms 0s ease-in', keyframes ([
          style({opacity: 0, transform: 'translateX(-30px)', offset:0}),
          style({opacity: 0.8, transform: 'translateX(10px)', offset:0.8}),
          style({opacity: 1, transform: 'translateX(0px)', offset:1})
        ]))
      ]),
      // essa transition animação causa o efeito de arrasta pra esqueda quando remove... o item
      transition('ready => void', [
        animate('300ms 0s ease-in', keyframes ([
          style({opacity: 1, transform: 'translateX(0px)', offset:0}),
          style({opacity: 0.8, transform: 'translateX(10px)', offset:0.2}),
          style({opacity: 0, transform: 'translateX(-30px)', offset:1})
        ]))
      ])
    ])
  ] // essa animação causa o efeito de arrasta pra direita... o item
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready';

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  itens(): any[]{
    console.log(this.shoppingCartService.items);
    return this.shoppingCartService.items;
  }

  total(): number{
    return this.shoppingCartService.total();
  }

  clear(){
    this.shoppingCartService.clear();
  }

  removeItem(item: any){
    this.shoppingCartService.removeItem(item);
  }

  addItem(item: any){
    this.shoppingCartService.addItem(item);
  }
}
