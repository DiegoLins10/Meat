import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', loadChildren: () => import('./about/about.module').then(d => d.AboutModule)},
  {path: 'restaurants/:id', component: RestaurantDetailComponent, 
  children:[
    {path: 'menu', component: MenuComponent},  //usando caminhos filhos
    {path: 'reviews', component: ReviewsComponent}, 
    {path: '', redirectTo: 'menu', pathMatch: 'full'}, // se não adicionar nada rediciona para menu
  ]},
  {path: 'restaurants', component: RestaurantsComponent},
  {path: 'order', loadChildren: () => import('./order/order.module').then(d => d.OrderModule)},
  {path: 'order-summary', component: OrderSummaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
