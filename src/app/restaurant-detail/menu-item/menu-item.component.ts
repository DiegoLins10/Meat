import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from './menu-item.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms 0s ease-in')
      ])
    ])
  ] // essa animação causa o efeito de descendo... o item
  
})
export class MenuItemComponent implements OnInit {

 menuItemState = 'ready';

 @Input() menuItem!: MenuItem
 @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitAddEvent(){
    this.add.emit(this.menuItem);
  }
}
