import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Movie } from '../../model/movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  private movieSubscription:Subscription;
  movies: Movie[] = [];
  totalPages: number;
  type: string = "movie";
  range: number = 5;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(p: number = 1) {
    this.movieSubscription = this.data.loadMovies(p).subscribe(success => {
      if (success) {
        this.data.movies$.subscribe(m => {
          this.movies = m;
          this.totalPages = this.data.totalMoviePages;
          this.range = Math.min(this.totalPages, 5);
        });
      }
      else {
        alert("The Movies Couldn't load");
      }
    });
  }

  ngOnDestroy(){
    this.movieSubscription.unsubscribe();
  }

}
