import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

restaurants!: Restaurant[]

  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit(): void {
    this.restaurantsService.restaurants()
    .subscribe((res: Restaurant[]) => this.restaurants = res)
  }

}
