import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Movie } from '../shared/model/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies:Movie[] = [];
  totalPages:number;
  type:string = "movie"
  constructor(private data:DataService) { }

  ngOnInit(): void {
    console.log("Movies Component Initializating...");
    this.loadPage();
  }

  loadPage(p:number = 1){
    this.data.loadMovies().subscribe(success =>
      {
        if(success){
         this.data.movies$.subscribe(m => this.movies = m);
         this.totalPages = this.data.totalMoviePages;
        }
        else{
          alert("The Movies Couldn't load");
        }
    });
  }

}
