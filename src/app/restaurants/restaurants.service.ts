import { Restaurant } from "./restaurant/restaurant.model";
import { MEAT_API } from "../app.api";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from "../app.error-handler";
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model";


@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient){

    }

    restaurants(): any{
        return this.http
        .get(`${MEAT_API}/restaurants`)
        .pipe(map((body: any) => body),
             catchError(ErrorHandler.handleError) 
        );
    }

    restaurantById(id: string): Observable<Restaurant>{
      return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
      .pipe(map((body: any) => body),
             catchError(ErrorHandler.handleError) 
        );
    }

    reviewsOfRestaurant(id: string): Observable<any>{
      return this.http.get<any>(`${MEAT_API}/restaurants/${id}/reviews`)
      .pipe(map((body: any) => body),
             catchError(ErrorHandler.handleError) 
        );
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]>{
      return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
      .pipe(map((body: any) => body),
             catchError(ErrorHandler.handleError) 
        );
    }

}