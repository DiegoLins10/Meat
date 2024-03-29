import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantsService } from 'src/app/restaurants/restaurants.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews?: Observable<any>

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reviews = this.restaurantsService
    .reviewsOfRestaurant(this.route.parent?.snapshot.params['id'])
  }

}
