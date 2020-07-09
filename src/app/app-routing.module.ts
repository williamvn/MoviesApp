import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"movies", component: MoviesComponent},
  {path:"tv-shows", component:TvShowsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
