import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { MoviesComponent } from './containers/movies/movies.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { TvShowsComponent } from './containers/tv-shows/tv-shows.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HomeComponent } from './containers/home/home.component';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { SearchComponent } from './components/search/search.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { ListComponent } from './containers/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    MoviesComponent,
    TvShowsComponent,
    PaginationComponent,
    HomeComponent,
    ProductDetailsComponent,
    SearchComponent,
    NotFoundComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
