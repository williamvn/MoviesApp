import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TVShow } from './model/tvshow';
import { Movie } from './model/movie';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';



@Injectable()
export class DataService {

  tvshows: TVShow[];
  movies: Movie[];
  constructor(private httpClient: HttpClient) { }

  loadMovies(page = 1):Observable<boolean> {
    return  this.httpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=en-US&page=${page}`)
      .pipe(
        map((data: Movie[]) => {
          this.movies = data;
          return true;
        }));
  }

  loadTVShows(page = 1):Observable<boolean> {
    return  this.httpClient.get(`https://api.themoviedb.org/3/tv/popular?api_key=cea68b520beecac6718820e4ac576c3a&append_to_response=credits&language=es-ES&page=${page}`)
      .pipe(
        map((data: TVShow[]) => {
          this.tvshows = data;
          return true;
        }));
  }
}
