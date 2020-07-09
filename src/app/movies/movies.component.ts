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
    this.data.loadMovies().subscribe(success =>
      {
        if(success){
         this.movies = this.data.movies;
         this.totalPages = this.data.totalMoviePages;
        }
        else{
          alert("The Movies Couldn't load");
        }
    });
  }

  loadPage(p:number){
    this.data.loadMovies(p).subscribe(success =>
      {
        if(success){
         this.movies = this.data.movies;
         this.totalPages = this.data.totalMoviePages;
        }
        else{
          alert("The Movies Couldn't load");
        }
    });
  }

}
