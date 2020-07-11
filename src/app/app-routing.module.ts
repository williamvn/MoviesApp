import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';


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
