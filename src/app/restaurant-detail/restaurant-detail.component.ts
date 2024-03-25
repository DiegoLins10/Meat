import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../restaurants/restaurant/restaurant.model';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant!: Restaurant;

  constructor(private service: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetDetails();
  }


  GetDetails(){
    this.service.restaurantById(this.route.snapshot.params['id']).subscribe({
      next: res =>{
        this.restaurant = res
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        // do something when all observables are complete
        // show success creation of all three entities
      }
    });
  }
}
