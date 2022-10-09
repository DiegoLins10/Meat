import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão de refeição', value: 'REF'}, 
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
