import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './containers/movies/movies.component';
import { TvShowsComponent } from './containers/tv-shows/tv-shows.component';
import { HomeComponent } from './containers/home/home.component';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"movies", component: MoviesComponent},
  {path:"tv-shows", component:TvShowsComponent},
  {path:":product/:productId", component:ProductDetailsComponent},
  {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
