import { Restaurant } from "./restaurant/restaurant.model";
import { MEAT_API } from "../app.api";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from "../app.error-handler";


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
    /*
     restaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`);
  }*/
}