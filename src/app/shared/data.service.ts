import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { TVShow, TVResponse } from './model/tvshow';
import { Movie, MovieResponse } from './model/movie';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';



@Injectable()
export class DataService {
  API_KEY = "cea68b520beecac6718820e4ac576c3a";
  LANGUAGE = "en-US";

  tvshows: TVShow[];
  movies: Movie[];
  totalMoviePages:number;
  totalTVPages:number;
  constructor(private httpClient: HttpClient) { }

  loadMovies(page = 1):Observable<boolean> {
    console.log("Getting Movies");
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', this.LANGUAGE)
      .set('page', "" + page);

    return  this.httpClient.get("https://api.themoviedb.org/3/movie/popular", {params})
      .pipe(
        map((data: MovieResponse) => {
          this.movies = data.results;
          this.totalMoviePages = data.total_pages;
          return true;
        }));
  }

  loadTVShows(page = 1):Observable<boolean> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', this.LANGUAGE)
      .set('page', "" + page);

    return  this.httpClient.get(`https://api.themoviedb.org/3/tv/popular`, {params})
      .pipe(
        map((data: TVResponse) => {
          this.tvshows = data.results;
          this.totalTVPages = data.total_pages;
          return true;
        }));
  }
}
