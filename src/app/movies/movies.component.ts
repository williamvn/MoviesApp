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
  constructor(private data:DataService) { }

  ngOnInit(): void {
    console.log("Movies Component Initializating...");
    this.data.loadMovies().subscribe(success =>
      {
        if(success){
         this.movies = this.data.movies;
        }
        else{
          alert("The Movies Couldn't load");
        }
    });
  }

}
