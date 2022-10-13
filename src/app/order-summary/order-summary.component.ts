import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  rated: any;

  constructor() { }

  ngOnInit(): void {
  }

  setSelectedRated(rate: number){
    this.rated = rate;
  }

}
